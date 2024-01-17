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
model RelationPermissionToRole {
  id           String     @id @default(uuid())
  permissionId String
  permission   Permission @relation(fields: [permissionId], references: [id])
  roleId       String
  role         Role       @relation(fields: [roleId], references: [id])
  granterId    String
  granter      User       @relation(fields: [granterId], references: [id])
  isAllowed    Boolean?
  grantedAt    DateTime   @default(now())

  @@unique([permissionId, roleId])
}
*/

export const RelationPermissionToRoleObject = objectType({
  name: 'RelationPermissionToRole',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('permissionId');
    t.field('permission', {
      type: 'Permission',
    });
    t.nonNull.string('roleId');
    t.field('role', {
      type: 'Role',
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

export const RelationPermissionToRoleWhereInput = inputObjectType({
  name: 'RelationPermissionToRoleWhereInput',
  definition(t) {
    t.field('id', {
      type: 'StringFilter',
    });
    t.field('permissionId', {
      type: 'StringFilter',
    });
    t.field('roleId', {
      type: 'StringFilter',
    });
  },
});

export const RelationPermissionToRoleOrderByWithRelationInput = inputObjectType(
  {
    name: 'RelationPermissionToRoleOrderByWithRelationInput',
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

export const RelationPermissionToRoleQuery = extendType({
  type: 'Query',

  definition(t) {
    t.nonNull.list.field('relationsPermissionToRole', {
      type: nonNull('RelationPermissionToRole'),
      args: {
        ...findManyGraphqlArgs,
        where: 'RelationPermissionToRoleWhereInput',
        orderBy: list('RelationPermissionToRoleOrderByWithRelationInput'),
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RelationPermissionToRoleFindManyArgs =
          parseGraphQLQuery(info, args);
        const relationsPermissionToRole =
          await ctx.db.relationPermissionToRole.findMany(prismaArgs);
        return relationsPermissionToRole;
      },
    });

    t.field('relationPermissionToRole', {
      type: 'RelationPermissionToRole',
      args: {
        where: nonNull('RelationPermissionToRoleWhereInput'),
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RelationPermissionToRoleFindFirstArgs =
          parseGraphQLQuery(info, args);
        const relationPermissionToRole =
          await ctx.db.relationPermissionToRole.findFirst(prismaArgs);
        return relationPermissionToRole as any;
      },
    });

    t.nonNull.int('relationsPermissionToRoleCount', {
      args: {
        where: 'RelationPermissionToRoleWhereInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RelationPermissionToRoleCountArgs =
          parseGraphQLQuery(info, args);
        const count = await ctx.db.relationPermissionToRole.count(prismaArgs);
        return count;
      },
    });
  },
});

export const RelationPermissionToRoleMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createRelationPermissionToRole', {
      type: 'RelationPermissionToRole',
      args: {
        permissionId: nonNull(stringArg()),
        roleId: nonNull(stringArg()),
        isAllowed: booleanArg(),
        granterId: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { permissionId, roleId, isAllowed, granterId, ...restArgs } =
          args;
        const prismaArgs = parseGraphQLQuery(info, restArgs);
        const cacheArgs = cacheUpdater.formArgs(prismaArgs);
        const relationPermissionToRole =
          await ctx.db.relationPermissionToRole.create({
            ...cacheArgs,
            data: {
              permissionId,
              roleId,
              isAllowed,
              granterId,
            },
          });
        await cacheUpdater.one(relationPermissionToRole);
        return relationPermissionToRole as any;
      },
    });
    t.nonNull.field('updateRelationPermissionToRole', {
      type: 'RelationPermissionToRole',
      args: {
        id: nonNull(stringArg()),
        data: nonNull(
          inputObjectType({
            name: 'RelationPermissionToRoleUpdateInput',
            definition(t) {
              t.string('permissionId');
              t.string('roleId');
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
        const relationPermissionToRole =
          await ctx.db.relationPermissionToRole.update({
            ...cacheArgs,
            where: { id },
            data: {
              permissionId: data.permissionId ?? undefined,
              roleId: data.roleId ?? undefined,
              granterId: data.granterId ?? undefined,
              isAllowed: data.isAllowed,
            },
          });
        await cacheUpdater.one(relationPermissionToRole);
        return relationPermissionToRole as any;
      },
    });
    t.field('deleteRelationPermissionToRole', {
      type: 'RelationPermissionToRole',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { id, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery(info, restArgs);
        const cacheArgs = cacheUpdater.formArgs(prismaArgs);
        const relationPermissionToRole =
          await ctx.db.relationPermissionToRole.delete({
            ...cacheArgs,
            where: {
              id: id,
            },
          });
        await cacheUpdater.one(relationPermissionToRole);
        return relationPermissionToRole as any;
      },
    });
    t.field('deleteRelationsPermissionToRole', {
      type: 'BatchPayload',
      args: {
        ids: nonNull(list(nonNull(stringArg()))),
      },
      async resolve(root, args, ctx, info) {
        const { ids } = args;
        await cacheUpdater.many(ids);
        const batchPayload = await ctx.db.relationPermissionToRole.deleteMany({
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
        roleId: true,
      },
    };
    const result = deepmerge(args, extraArgs);
    return result;
  },
  one: async (relationPermissionToRole?: {
    permission: {
      name: string;
    };
    roleId: string;
  }) => {
    if (relationPermissionToRole) {
      const permissionName = relationPermissionToRole.permission.name;
      const users = await db.user.findMany({
        where: {
          relationRoleToUserAsUser: {
            some: { roleId: relationPermissionToRole.roleId },
          },
        },
        select: {
          id: true,
        },
      });
      await checkUserAuthorizedForPermissionCache.invalidatePermissionForUsers({
        permissionName: permissionName,
        userIds: users.map((u) => u.id),
      });
    }
  },
  many: async function (ids: string[]) {
    const relationsPermissionToRole =
      await db.relationPermissionToRole.findMany({
        ...this.formArgs({}),
        where: {
          id: { in: ids },
        },
      });
    const users = await db.user.findMany({
      where: {
        relationRoleToUserAsUser: {
          some: {
            roleId: { in: relationsPermissionToRole.map((r) => r.roleId) },
          },
        },
      },
      select: {
        id: true,
        relationRoleToUserAsUser: { select: { roleId: true } },
      },
    });
    const roleIdToUsersMap: any = {};
    for (const user of users) {
      const roleId = user.relationRoleToUserAsUser[0].roleId;
      if (roleId in roleIdToUsersMap) {
        roleIdToUsersMap[roleId] = [...roleIdToUsersMap[roleId], user];
      } else {
        roleIdToUsersMap[roleId] = [user];
      }
    }
    const items: {
      permissionName: string;
      userIds: string[];
    }[] = [];
    for (const relation of relationsPermissionToRole) {
      const permissionName = relation.permission.name;
      const roleId = relation.roleId;
      const userIds = roleIdToUsersMap[roleId].map((u: any) => u.id);
      items.push({ permissionName, userIds });
    }
    await checkUserAuthorizedForPermissionCache.invalidatePermissionsForUsers(
      items
    );
  },
};
