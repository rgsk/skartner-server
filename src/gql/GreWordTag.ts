import { Prisma } from '@prisma/client';
import { addDateFieldsDefinitions } from 'lib/graphqlUtils';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import { extendType, objectType } from 'nexus';

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

export const GreWordTagQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('greWordTags', {
      type: 'GreWordTag',
      args: {},
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
