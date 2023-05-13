import { GptPrompt, Prisma } from '@prisma/client';
import { Context, context } from 'context';
import DataLoader from 'dataloader';
import { deriveEntityArrayMapFromArray } from 'lib/generalUtils';
import {
  StringFilter,
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
  },
});

const GreWordWhereInput = inputObjectType({
  name: 'GreWordWhereInput',
  definition(t) {
    t.field('id', {
      type: StringFilter,
    });
    t.field('spelling', {
      type: StringFilter,
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
      type: GreWordObject,
      args: {
        spelling: nonNull(stringArg()),
        promptInput: nonNull(stringArg()),
        promptResponse: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { spelling, promptInput, promptResponse, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery(info, restArgs);
        const greWord = await ctx.db.greWord.upsert({
          ...prismaArgs,
          create: {
            spelling: spelling,
            gptPrompts: {
              create: {
                input: promptInput,
                response: promptResponse,
              },
            },
          },
          where: {
            spelling: spelling,
          },
          update: {
            gptPrompts: {
              create: {
                input: promptInput,
                response: promptResponse,
              },
            },
          },
        });
        return greWord;
      },
    });
  },
});
