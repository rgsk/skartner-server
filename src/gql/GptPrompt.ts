import { GreWord, Prisma } from '@prisma/client';
import { Context, context } from 'context';
import DataLoader from 'dataloader';
import cacheValue from 'lib/cache/cacheValue';
import { deriveEntityMapFromArray } from 'lib/generalUtils';
import {
  addDateFieldsDefinitions,
  findManyGraphqlArgs,
} from 'lib/graphqlUtils';
import openAIApi from 'lib/openAIApi';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { ChatCompletionRequestMessage } from 'openai';

function createGreWordsLoader(ctx: Context) {
  return new DataLoader<string, GreWord>(
    async (ids) => {
      const greWords = await ctx.db.greWord.findMany({
        where: { id: { in: [...ids] } },
      });
      const idToGreWordMap = deriveEntityMapFromArray(
        greWords,
        (greWord: GreWord) => greWord.id
      );
      console.log({ greWordsLoaderIds: ids });
      return ids.map((id) => idToGreWordMap.get(id));
    },
    { cache: false }
  );
}

const greWordsLoader = createGreWordsLoader(context);

export const GptPromptObject = objectType({
  name: 'GptPrompt',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('input');
    t.nonNull.string('response');
    t.string('editedResponse');

    t.field('greWord', {
      type: 'GreWord',
      resolve: async (gptPrompt: any, args, ctx) => {
        if (gptPrompt.greWord) {
          return gptPrompt.greWord;
        }
        if (!gptPrompt.greWordId) {
          return null;
        }
        return greWordsLoader.load(gptPrompt.greWordId);
      },
    });
    t.string('greWordId');
    t.field('user', {
      type: 'User',
    });
    t.string('userId');
    t.nonNull.field('meta', {
      type: 'Json',
    });
    addDateFieldsDefinitions(t);
  },
});

export const GptPromptQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('gptPrompts', {
      type: GptPromptObject,
      args: findManyGraphqlArgs,
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.GptPromptFindManyArgs = parseGraphQLQuery(
          info,
          args
        );
        const gptPrompts = await ctx.db.gptPrompt.findMany(prismaArgs);
        return gptPrompts;
      },
    });
    t.string('sendSinglePrompt', {
      args: {
        input: nonNull(stringArg()),
      },
      async resolve(root, args, ctx) {
        const result = await cacheValue('db', {
          key: {
            query: 'sendSinglePrompt',
            args,
          },
          getValue: async () => {
            const message = await sendPrompt([
              { role: 'user', content: args.input },
            ]);
            const result = message?.content ?? null;
            return result;
          },
          getFromCache: (value) => value.result,
          setInCache: (value) => ({ result: value }),
        });
        return result;
      },
    });
  },
});

export const GptPromptMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteGptPrompt', {
      type: 'GptPrompt',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { id, ...restArgs } = args;
        const prismaArgs: Prisma.GptPromptDeleteArgs = parseGraphQLQuery(
          info,
          restArgs
        );
        const gptPrompt = await ctx.db.gptPrompt.delete({
          ...prismaArgs,
          where: {
            id: id,
          },
        });
        return gptPrompt;
      },
    });
    t.field('createGptPrompt', {
      type: nonNull('GptPrompt'),
      args: {
        input: nonNull(stringArg()),
        response: nonNull(stringArg()),
        greWordId: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { input, response, greWordId, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery<Prisma.GptPromptCreateArgs>(
          info,
          restArgs
        );
        const gptPrompt = await ctx.db.gptPrompt.create({
          ...prismaArgs,
          data: {
            input: input,
            response: response,
            greWordId: greWordId,
          },
        });
        // creation of gptPrompt updates the greWord updatedAt
        await ctx.db.greWord.update({
          where: { id: greWordId },
          data: { updatedAt: new Date() },
        });
        return gptPrompt;
      },
    });
    t.field('updateGptPrompt', {
      type: 'GptPrompt',
      args: {
        id: nonNull(stringArg()),
        editedResponse: stringArg(),
      },
      async resolve(root, args, ctx, info) {
        const { id, editedResponse, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery<Prisma.GptPromptUpdateArgs>(
          info,
          restArgs
        );
        const gptPrompt = await ctx.db.gptPrompt.update({
          ...prismaArgs,
          where: {
            id: id,
          },
          data: {
            editedResponse,
          },
        });
        return gptPrompt;
      },
    });
  },
});

export const sendPrompt = async (messages: ChatCompletionRequestMessage[]) => {
  const result = await openAIApi.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });
  return result.data.choices[0].message;
};
