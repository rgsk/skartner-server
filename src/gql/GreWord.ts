import { GptPrompt, Prisma } from '@prisma/client';
import { Context, context } from 'context';
import DataLoader from 'dataloader';
import { deriveEntityArrayMapFromArray } from 'lib/generalUtils';
import {
  addDateFieldsDefinitions,
  findManyGraphqlArgs,
} from 'lib/graphqlUtils';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import {
  extendType,
  inputObjectType,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';

function createGptPromptsLoader(ctx: Context) {
  return new DataLoader<string, GptPrompt[]>(
    async (ids) => {
      const gptPrompts = await ctx.db.gptPrompt.findMany({
        where: { greWordId: { in: [...ids] } },
      });
      const idToGrePromptsMap = deriveEntityArrayMapFromArray(
        gptPrompts,
        (gptPrompt: GptPrompt) => gptPrompt.greWordId
      );
      console.log({ grePromptsLoaderIds: ids });
      return ids.map((id) => idToGrePromptsMap.get(id) ?? []);
    },
    { cache: false }
  );
}

const grePromptsLoader = createGptPromptsLoader(context);

export const GreWordObject = objectType({
  name: 'GreWord',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('spelling');
    addDateFieldsDefinitions(t);
    t.nonNull.list.field('gptPrompts', {
      type: nonNull('GptPrompt'),
      resolve: async (greWord: any, args, ctx) => {
        if (greWord.gptPrompts) {
          return greWord.gptPrompts;
        }
        return grePromptsLoader.load(greWord.id);
      },
    });
    t.field('user', {
      type: 'User',
    });
    t.string('userId');
  },
});

const GreWordWhereInput = inputObjectType({
  name: 'GreWordWhereInput',
  definition(t) {
    t.field('id', {
      type: 'StringFilter',
    });
    t.field('spelling', {
      type: 'StringFilter',
    });
    t.field('userId', {
      type: 'StringFilter',
    });
  },
});

export const GreWordQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('greWords', {
      type: nonNull('GreWord'),
      args: {
        ...findManyGraphqlArgs,
        where: GreWordWhereInput,
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.GreWordFindManyArgs = parseGraphQLQuery(
          info,
          args
        );
        const greWords = await ctx.db.greWord.findMany(prismaArgs);
        return greWords;
      },
    });
    t.nonNull.int('greWordsCount', {
      args: {
        where: GreWordWhereInput,
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.GreWordCountArgs = parseGraphQLQuery(
          info,
          args
        );
        const greWordsCount = await ctx.db.greWord.count(prismaArgs);
        return greWordsCount;
      },
    });
  },
});

export const GreWordMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createGreWord', {
      type: 'GreWord',
      args: {
        spelling: nonNull(stringArg()),
        promptInput: nonNull(stringArg()),
        promptResponse: nonNull(stringArg()),
        userId: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { spelling, promptInput, promptResponse, userId, ...restArgs } =
          args;
        const prismaArgs = parseGraphQLQuery(info, restArgs);
        const greWord = await ctx.db.greWord.upsert({
          ...prismaArgs,
          create: {
            spelling: spelling,
            userId: userId,
            gptPrompts: {
              create: {
                input: promptInput,
                response: promptResponse,
                userId: userId,
              },
            },
          },
          where: {
            spelling_userId: {
              spelling: spelling,
              userId: userId,
            },
          },
          update: {
            gptPrompts: {
              create: {
                input: promptInput,
                response: promptResponse,
                userId: userId,
              },
            },
          },
        });
        return greWord;
      },
    });
    t.field('deleteGreWord', {
      type: 'GreWord',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { id, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery(info, restArgs);
        const greWord = await ctx.db.greWord.delete({
          ...prismaArgs,
          where: {
            id: id,
          },
        });
        return greWord;
      },
    });
  },
});
