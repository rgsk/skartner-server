import { GptPrompt, GreWordStatus, Prisma } from '@prisma/client';
import { Context, context } from 'context';
import DataLoader from 'dataloader';
import { deriveEntityArrayMapFromArray } from 'lib/generalUtils';
import {
  addDateFieldsDefinitions,
  findManyGraphqlArgs,
} from 'lib/graphqlUtils';

import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import {
  enumType,
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { z } from 'zod';
import { notifyUser } from './Notification';
import { getEnumFilter } from './Types';

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

export const GreWordStatusEnum = enumType({
  name: 'GreWordStatus',
  members: Object.values(GreWordStatus),
});

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
    t.nonNull.field('status', {
      type: 'GreWordStatus',
    });
    t.nonNull.field('meta', {
      type: 'Json',
    });
    t.list.nonNull.field('greWordTags', {
      type: 'GreWordTag',
    });
  },
});

export const EnumGreWordStatusFilter = getEnumFilter('GreWordStatus');

export const GreWordWhereInput = inputObjectType({
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
    t.field('greWordTags', {
      type: 'GreWordTagListRelationFilter',
    });
    t.field('status', {
      type: 'EnumGreWordStatusFilter',
    });
    t.field('user', {
      type: 'UserWhereInput',
    });
  },
});

export const GreWordWhereUniqueInput = inputObjectType({
  name: 'GreWordWhereUniqueInput',
  definition(t) {
    t.string('id');
    t.field('spelling_userId', {
      type: inputObjectType({
        name: 'GreWordSpellingUserIdCompoundUniqueInput',
        definition(t) {
          t.nonNull.string('spelling');
          t.nonNull.string('userId');
        },
      }),
    });
  },
});

export const GreWordTagListRelationFilter = inputObjectType({
  name: `GreWordTagListRelationFilter`,
  definition(t) {
    t.field('every', {
      type: 'GreWordTagWhereInput',
    });
    t.field('some', {
      type: 'GreWordTagWhereInput',
    });
    t.field('none', {
      type: 'GreWordTagWhereInput',
    });
  },
});

export const GreWordOrderByWithRelationInput = inputObjectType({
  name: 'GreWordOrderByWithRelationInput',
  definition(t) {
    t.field('id', {
      type: 'SortOrder',
    });
    t.field('spelling', {
      type: 'SortOrder',
    });
    t.field('createdAt', {
      type: 'SortOrder',
    });
    t.field('updatedAt', {
      type: 'SortOrder',
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
        where: 'GreWordWhereInput',
        orderBy: list('GreWordOrderByWithRelationInput'),
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.GreWordFindManyArgs = parseGraphQLQuery(
          info,
          args
        );
        const greWords = await ctx.db.greWord.findMany({
          ...prismaArgs,
        });
        return greWords;
      },
    });
    t.field('greWord', {
      type: 'GreWord',
      args: {
        where: 'GreWordWhereUniqueInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.GreWordFindUniqueArgs = parseGraphQLQuery(
          info,
          args
        );
        const greWord = await ctx.db.greWord.findUnique(prismaArgs);
        return greWord;
      },
    });
    t.nonNull.int('greWordsCount', {
      args: {
        where: 'GreWordWhereInput',
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
export const GreWordTagWhereUniqueInput = inputObjectType({
  name: 'GreWordTagWhereUniqueInput',
  definition(t) {
    t.string('id');
    t.string('name');
  },
});

const ZGreWordTagWhereUniqueInput = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export const GreWordMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createGreWord', {
      type: nonNull('GreWord'),
      args: {
        spelling: nonNull(stringArg()),
        promptInput: nonNull(stringArg()),
        promptResponse: nonNull(stringArg()),
        userId: nonNull(stringArg()),
        status: 'GreWordStatus',
        greWordTags: list('GreWordTagWhereUniqueInput'),
      },
      async resolve(root, args, ctx, info) {
        const {
          spelling,
          promptInput,
          promptResponse,
          userId,
          greWordTags: _greWordTags,
          status,
          ...restArgs
        } = args;
        const prismaArgs = parseGraphQLQuery<Prisma.GreWordCreateArgs>(
          info,
          restArgs
        );
        const validator = z.object({
          greWordTags: z.array(ZGreWordTagWhereUniqueInput).optional(),
        });

        const { greWordTags } = validator.parse({
          greWordTags: _greWordTags,
        });

        const greWord = await ctx.db.greWord.create({
          ...prismaArgs,
          data: {
            spelling: spelling,
            userId: userId,
            status: status ?? undefined,
            gptPrompts: {
              create: {
                input: promptInput,
                response: promptResponse,
                userId: userId,
              },
            },
            greWordTags: {
              connect: greWordTags,
            },
          },
        });
        notifyUser({ userId: userId, message: `${spelling} word added` });
        return greWord;
      },
    });
    t.field('updateGreWord', {
      type: 'GreWord',
      args: {
        id: nonNull(stringArg()),
        status: 'GreWordStatus',
        greWordTags: list('GreWordTagWhereUniqueInput'),
      },
      async resolve(root, args, ctx, info) {
        const { id, status, greWordTags: _greWordTags, ...restArgs } = args;

        const validator = z.object({
          greWordTags: z.array(ZGreWordTagWhereUniqueInput).optional(),
        });

        const { greWordTags } = validator.parse({
          greWordTags: _greWordTags,
        });

        const prismaArgs = parseGraphQLQuery<Prisma.GreWordUpdateArgs>(
          info,
          restArgs
        );
        const greWord = await ctx.db.greWord.update({
          ...prismaArgs,
          where: {
            id: id,
          },
          data: {
            status: status ?? undefined,
            greWordTags: {
              set: greWordTags,
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
        const prismaArgs = parseGraphQLQuery<Prisma.GreWordDeleteArgs>(
          info,
          restArgs
        );
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
