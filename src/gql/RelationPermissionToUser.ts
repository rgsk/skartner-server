import { Prisma } from '@prisma/client';
import { db } from 'db';
import deepmerge from 'deepmerge';
import { findManyGraphqlArgs } from 'lib/graphqlUtils';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import { checkUserAuthorizedForPermissionCache } from 'middlewares/authorize';
import {
  booleanArg,
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';

/*
model RelationPermissionToUser {
  id           String     @id @default(uuid())
  permissionId String
  permission   Permission @relation(fields: [permissionId], references: [id])
  userId       String
  user         User       @relation(name: "User", fields: [userId], references: [id])
  granterId    String
  granter      User       @relation(name: "Granter", fields: [granterId], references: [id])
  isAllowed    Boolean?
  grantedAt    DateTime   @default(now())

  @@unique([permissionId, userId])
}
*/

export const RelationPermissionToUserObject = objectType({
  name: 'RelationPermissionToUser',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('permissionId');
    t.field('permission', {
      type: 'Permission',
    });

    t.nonNull.string('userId');
    t.field('user', {
      type: 'User',
    });
    t.nonNull.string('granterId');
    t.field('granter', {
      type: 'User',
    });
    t.boolean('isAllowed');
    t.nonNull.field('grantedAt', {
      type: 'String',
      resolve: (root: any) => root.grantedAt.toISOString(),
    });
  },
});

export const RelationPermissionToUserWhereInput = inputObjectType({
  name: 'RelationPermissionToUserWhereInput',
  definition(t) {
    t.field('id', {
      type: 'StringFilter',
    });
    t.field('permissionId', {
      type: 'StringFilter',
    });
  },
});

export const RelationPermissionToUserOrderByWithRelationInput = inputObjectType(
  {
    name: 'RelationPermissionToUserOrderByWithRelationInput',
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
  }
);

export const RelationPermissionToUserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('relationsPermissionToUser', {
      type: 'RelationPermissionToUser',
      args: {
        ...findManyGraphqlArgs,
        where: 'RelationPermissionToUserWhereInput',
        orderBy: list('RelationPermissionToUserOrderByWithRelationInput'),
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RelationPermissionToUserFindManyArgs =
          parseGraphQLQuery(info, args);
        const relationsPermissionToUser =
          await ctx.db.relationPermissionToUser.findMany(prismaArgs);
        return relationsPermissionToUser;
      },
    });

    t.field('relationPermissionToUser', {
      type: 'RelationPermissionToUser',
      args: {
        where: nonNull('RelationPermissionToUserWhereInput'),
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RelationPermissionToUserFindFirstArgs =
          parseGraphQLQuery(info, args);
        const relationPermissionToUser =
          await ctx.db.relationPermissionToUser.findFirst(prismaArgs);
        return relationPermissionToUser as any;
      },
    });

    t.nonNull.int('relationsPermissionToUserCount', {
      args: {
        where: 'RelationPermissionToUserWhereInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RelationPermissionToUserCountArgs =
          parseGraphQLQuery(info, args);
        const count = await ctx.db.relationPermissionToUser.count(prismaArgs);
        return count;
      },
    });
  },
});

export const RelationPermissionToUserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createRelationPermissionToUser', {
      type: 'RelationPermissionToUser',
      args: {
        permissionId: nonNull(stringArg()),
        userId: nonNull(stringArg()),
        isAllowed: booleanArg(),
        granterId: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { permissionId, userId, isAllowed, granterId, ...restArgs } =
          args;
        const prismaArgs = parseGraphQLQuery(info, restArgs);
        const cacheArgs = cacheUpdater.formArgs(prismaArgs);
        const relationPermissionToUser =
          await ctx.db.relationPermissionToUser.create({
            ...cacheArgs,
            data: {
              permissionId,
              userId,
              isAllowed,
              granterId,
            },
          });
        await cacheUpdater.one(relationPermissionToUser);
        return relationPermissionToUser as any;
      },
    });
    t.nonNull.field('updateRelationPermissionToUser', {
      type: 'RelationPermissionToUser',
      args: {
        id: nonNull(stringArg()),
        data: nonNull(
          inputObjectType({
            name: 'RelationPermissionToUserUpdateInput',
            definition(t) {
              t.string('permissionId');
              t.string('userId');
              t.string('granterId');
              t.boolean('isAllowed');
            },
          })
        ),
      },
      async resolve(root, args, ctx, info) {
        const { id, data, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery(info, restArgs);
        const cacheArgs = cacheUpdater.formArgs(prismaArgs);
        const relationPermissionToUser =
          await ctx.db.relationPermissionToUser.update({
            ...cacheArgs,
            where: { id },
            data: {
              permissionId: data.permissionId ?? undefined,
              userId: data.userId ?? undefined,
              granterId: data.granterId ?? undefined,
              isAllowed: data.isAllowed,
            },
          });
        await cacheUpdater.one(relationPermissionToUser);
        return relationPermissionToUser as any;
      },
    });
    t.field('deleteRelationPermissionToUser', {
      type: 'RelationPermissionToUser',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { id, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery(info, restArgs);
        const cacheArgs = cacheUpdater.formArgs(prismaArgs);
        const relationPermissionToUser =
          await ctx.db.relationPermissionToUser.delete({
            ...cacheArgs,
            where: {
              id: id,
            },
          });
        await cacheUpdater.one(relationPermissionToUser);
        return relationPermissionToUser as any;
      },
    });
    t.field('deleteRelationsPermissionToUser', {
      type: 'BatchPayload',
      args: {
        ids: nonNull(list(nonNull(stringArg()))),
      },
      async resolve(root, args, ctx, info) {
        const { ids } = args;
        await cacheUpdater.many(ids);
        const batchPayload = await ctx.db.relationPermissionToUser.deleteMany({
          where: {
            id: { in: ids },
          },
        });
        return batchPayload;
      },
    });
  },
});

const cacheUpdater = {
  formArgs: (args: any) => {
    const extraArgs = {
      select: {
        permission: {
          select: {
            name: true,
          },
        },
        userId: true,
      },
    };
    const result = deepmerge(args, extraArgs);
    return result;
  },
  one: async (relationPermissionToUser?: {
    permission: {
      name: string;
    };
    userId: string;
  }) => {
    if (relationPermissionToUser) {
      await checkUserAuthorizedForPermissionCache.invalidatePermissionForUser({
        permissionName: relationPermissionToUser.permission.name,
        userId: relationPermissionToUser.userId,
      });
    }
  },
  many: async function (ids: string[]) {
    const relationsPermissionToUser =
      await db.relationPermissionToUser.findMany({
        ...this.formArgs({}),
        where: {
          id: { in: ids },
        },
      });
    const keys = relationsPermissionToUser.map((r) => {
      return {
        permissionName: r.permission.name,
        userId: r.userId,
      };
    });
    await checkUserAuthorizedForPermissionCache.invalidatePermissionUserPairs(
      keys
    );
  },
};
