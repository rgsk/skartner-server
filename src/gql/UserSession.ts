import { Prisma } from '@prisma/client';
import { findManyGraphqlArgs } from 'lib/graphqlUtils';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import { extendType, inputObjectType, list, nonNull, objectType } from 'nexus';

export const UserSessionMetaParsedJsonValue = objectType({
  name: 'UserSessionMetaParsedJsonValue',
  definition(t) {
    t.string('none');
  },
});

export const UserSessionMetaParsedJsonValueInput = inputObjectType({
  name: 'UserSessionMetaParsedJsonValueInput',
  definition(t) {
    t.string('none');
  },
});

export const UserSessionObject = objectType({
  name: 'UserSession',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('userId');

    t.nonNull.field('user', {
      type: 'User',
      resolve(userSession: any) {
        return userSession.user;
      },
    });
    t.nonNull.field('meta', {
      type: 'UserSessionMetaParsedJsonValue',
      resolve(userSession: any) {
        return userSession.meta;
      },
    });

    t.nonNull.field('startedAt', {
      type: 'String',
      resolve: (root: any) => root.startedAt.toISOString(),
    });
    t.field('endedAt', {
      type: 'String',
      resolve: (root: any) => root.endedAt?.toISOString(),
    });
    t.int('duration');
  },
});

export const UserSessionWhereInput = inputObjectType({
  name: 'UserSessionWhereInput',
  definition(t) {
    t.field('id', {
      type: 'StringFilter',
    });

    t.field('userId', {
      type: 'StringFilter',
    });

    t.field('user', {
      type: 'UserWhereInput',
    });
  },
});

export const UserSessionWhereUniqueInput = inputObjectType({
  name: 'UserSessionWhereUniqueInput',
  definition(t) {
    t.string('id');
  },
});

export const UserSessionOrderByWithRelationInput = inputObjectType({
  name: 'UserSessionOrderByWithRelationInput',
  definition(t) {
    t.field('id', {
      type: 'SortOrder',
    });
    t.field('userId', {
      type: 'SortOrder',
    });
    t.field('startedAt', {
      type: 'SortOrder',
    });
    t.field('endedAt', {
      type: 'SortOrder',
    });
    t.field('duration', {
      type: 'SortOrder',
    });
    t.field('user', {
      type: 'UserOrderByWithRelationInput',
    });
  },
});

export const UserSessionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('userSessions', {
      type: nonNull('UserSession'),
      args: {
        ...findManyGraphqlArgs,
        where: 'UserSessionWhereInput',
        orderBy: list('UserSessionOrderByWithRelationInput'),
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.UserSessionFindManyArgs = parseGraphQLQuery(
          info,
          args
        );
        const userSessions = await ctx.db.userSession.findMany(prismaArgs);
        return userSessions;
      },
    });
    t.field('userSession', {
      type: 'UserSession',
      args: {
        where: nonNull('UserSessionWhereUniqueInput'),
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.UserSessionFindUniqueArgs = parseGraphQLQuery(
          info,
          args
        );
        const userSession = await ctx.db.userSession.findUnique(prismaArgs);
        return userSession;
      },
    });
    t.nonNull.int('userSessionsCount', {
      args: {
        where: 'UserSessionWhereInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.UserSessionCountArgs = parseGraphQLQuery(
          info,
          args
        );
        const userSessionsCount = await ctx.db.userSession.count(prismaArgs);
        return userSessionsCount;
      },
    });
  },
});
