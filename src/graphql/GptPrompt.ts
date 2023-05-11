import { GreWord, Prisma } from '@prisma/client';
import { Context, context } from 'context';
import DataLoader from 'dataloader';
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
    addDateFieldsDefinitions(t);
  },
});

export const GptPromptQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('gptPrompts', {
      type: GptPromptObject,
      args: findManyGraphqlArgs(),
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
        const message = await sendPrompt([
          { role: 'user', content: args.input },
        ]);
        return message?.content ?? null;
      },
    });
  },
});

export const sendPrompt = async (messages: ChatCompletionRequestMessage[]) => {
  return openAIApi
    .createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
    })
    .then((res) => {
      return res.data.choices[0].message;
    })
    .catch((e) => {
      console.log(e);
    });
};
