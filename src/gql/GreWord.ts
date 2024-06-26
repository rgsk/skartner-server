import { GptPrompt, GreWordStatus, Prisma } from '@prisma/client';
import DataLoader from 'dataloader';
import { deriveEntityArrayMapFromArray } from 'lib/generalUtils';
import {
  addDateFieldsDefinitions,
  findManyGraphqlArgs,
} from 'lib/graphqlUtils';

import { db } from 'db';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import {
  arg,
  enumType,
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { rules } from 'rules';
import { z } from 'zod';
import { getOrCreateCacheResponse } from './GptPrompt/GptPrompt';
import { ZGreWordTagWhereUniqueInput } from './GreWordTag';
import { notifyUser } from './Notification';
import { getEnumFilter } from './Types';

function createGptPromptsLoader() {
  return new DataLoader<string, GptPrompt[]>(
    async (ids) => {
      const gptPrompts = await db.gptPrompt.findMany({
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

const grePromptsLoader = createGptPromptsLoader();

export const GreWordStatusEnum = enumType({
  name: 'GreWordStatus',
  members: Object.values(GreWordStatus),
});

export const GreWordObject = objectType({
  name: 'GreWord',
  definition(t) {
    t.nonNull.string('id');
    t.string('pronunciationAudioUrl');
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

    t.nonNull.field('cacheWord', {
      type: 'CacheWord',
      resolve: async (root: any, args, ctx) => {
        return root.cacheWord;
      },
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
    t.field('cacheWord', {
      type: 'CacheWordWhereInput',
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

export const CacheWordWhereInput = inputObjectType({
  name: 'CacheWordWhereInput',
  definition(t) {
    t.field('text', {
      type: 'StringFilter',
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
        where: 'GreWordWhereInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.GreWordFindFirstArgs = parseGraphQLQuery(
          info,
          args
        );
        const greWord = await ctx.db.greWord.findFirst(prismaArgs);
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

export const CreateCacheResponseData = inputObjectType({
  name: 'CreateCacheResponseData',
  definition(t) {
    t.nonNull.string('word');
    t.nonNull.string('prompt');
    t.nonNull.string('result');
  },
});

export const GreWordMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createGreWord', {
      type: nonNull('GreWord'),
      args: {
        cacheResponseId: stringArg(),
        createCacheResponseData: arg({
          type: 'CreateCacheResponseData',
        }),
        userId: nonNull(stringArg()),
        status: 'GreWordStatus',
        greWordTags: list('GreWordTagWhereUniqueInput'),
      },
      async resolve(root, args, ctx, info) {
        const {
          cacheResponseId,
          createCacheResponseData,
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
        const cacheResponse = await getOrCreateCacheResponse({
          cacheResponseId,
          createCacheResponseData,
        });
        const greWord = await ctx.db.greWord.create({
          ...prismaArgs,
          data: {
            cacheWordId: cacheResponse.cacheWordId,
            userId: userId,
            status: status ?? undefined,
            gptPrompts: {
              create: {
                userId: userId,
                cacheResponseId: cacheResponse.id,
              },
            },
            greWordTags: {
              connect: greWordTags,
            },
          },
        });
        notifyUser({
          userId: userId,
          message: `${cacheResponse.cacheWord.text} word added`,
        });
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
        ...rules.isGreWordOwner.args,
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
