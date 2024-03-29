import { Prisma } from '@prisma/client';
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
import { z } from 'zod';

export const GreWordTagNameUserIdCompoundUniqueInput = inputObjectType({
  name: 'GreWordTagNameUserIdCompoundUniqueInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('userId');
  },
});

export const GreWordTagWhereUniqueInput = inputObjectType({
  name: 'GreWordTagWhereUniqueInput',
  definition(t) {
    t.string('id');
    t.field('name_userId', {
      type: 'GreWordTagNameUserIdCompoundUniqueInput',
    });
  },
});

export const ZGreWordTagWhereUniqueInput = z.object({
  id: z.string().optional(),
  name_userId: z
    .object({
      name: z.string(),
      userId: z.string(),
    })
    .optional(),
});

export const GreWordTagObject = objectType({
  name: 'GreWordTag',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nonNull.field('user', {
      type: 'User',
      resolve(greWordTag: any) {
        // no resolver need as prisma is handling that
        return greWordTag.user;
      },
    });
    t.nonNull.string('userId');
    t.nonNull.list.nonNull.field('greWords', {
      type: 'GreWord',
      resolve(greWordTag: any) {
        return greWordTag.greWords;
      },
    });
    t.nonNull.field('meta', {
      type: 'Json',
    });
    addDateFieldsDefinitions(t);
  },
});

export const GreWordTagWhereInput = inputObjectType({
  name: 'GreWordTagWhereInput',
  definition(t) {
    t.field('id', {
      type: 'StringFilter',
    });
    t.field('name', {
      type: 'StringFilter',
    });
    t.field('userId', {
      type: 'StringFilter',
    });
  },
});

export const GreWordTagQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('greWordTags', {
      type: 'GreWordTag',
      args: {
        ...findManyGraphqlArgs,
        where: 'GreWordTagWhereInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.GreWordTagFindManyArgs = parseGraphQLQuery(
          info,
          args
        );
        const greWordTags = await ctx.db.greWordTag.findMany({
          ...prismaArgs,
        });
        return greWordTags;
      },
    });
  },
});

export const GreWordTagMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createGreWordTag', {
      type: nonNull('GreWordTag'),
      args: {
        name: nonNull(stringArg()),
        userId: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { name, userId, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery<Prisma.GreWordTagCreateArgs>(
          info,
          restArgs
        );
        const greWordTag = await ctx.db.greWordTag.create({
          ...prismaArgs,
          data: {
            name: name,
            userId,
          },
        });
        return greWordTag;
      },
    });
    t.field('deleteGreWordTag', {
      type: nonNull('GreWordTag'),
      args: {
        name: nonNull(stringArg()),
        userId: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { name, userId, ...restArgs } = args;
        const prismaArgs: Prisma.GreWordTagDeleteArgs = parseGraphQLQuery(
          info,
          restArgs
        );
        const greWordTag = await ctx.db.greWordTag.delete({
          ...prismaArgs,
          where: {
            name_userId: {
              name: name,
              userId: userId,
            },
          },
        });
        return greWordTag;
      },
    });
  },
});
