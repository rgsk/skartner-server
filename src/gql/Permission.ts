import { Prisma } from '@prisma/client';
import {
  addDateFieldsDefinitions,
  findManyGraphqlArgs,
} from 'lib/graphqlUtils';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import {
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';

/*
model Permission {
  id                                   String                     @id @default(uuid())
  name                                 String                     @unique
  meta                                 Json                       @default("{}")
  createdAt                            DateTime                   @default(now())
  updatedAt                            DateTime                   @updatedAt
  relationPermissionToUserAsPermission RelationPermissionToUser[]
  relationPermissionToRoleAsPermission RelationPermissionToRole[]
  permissionHierarchyAsChild           PermissionHierarchy[]      @relation("Child")
  permissionHierarchyAsParent          PermissionHierarchy[]      @relation("Parent")

  @@map("Permissions")
}

*/

export const PermissionWhereInput = inputObjectType({
  name: 'PermissionWhereInput',
  definition(t) {
    t.field('id', {
      type: 'StringFilter',
    });
    t.field('name', {
      type: 'StringFilter',
    });
  },
});

export const PermissionObject = objectType({
  name: 'Permission',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nonNull.field('meta', {
      type: 'Json',
    });
    addDateFieldsDefinitions(t);
    t.nonNull.list.nonNull.field('relationPermissionToUserAsPermission', {
      type: 'RelationPermissionToUser',
    });
    t.nonNull.list.nonNull.field('relationPermissionToRoleAsPermission', {
      type: 'RelationPermissionToRole',
    });
    t.nonNull.list.nonNull.field('permissionHierarchyAsChild', {
      type: 'PermissionHierarchy',
    });
    t.nonNull.list.nonNull.field('permissionHierarchyAsParent', {
      type: 'PermissionHierarchy',
    });
  },
});

export const PermissionOrderByWithRelationInput = inputObjectType({
  name: 'PermissionOrderByWithRelationInput',
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

export const PermissionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('permissions', {
      type: 'Permission',
      args: {
        ...findManyGraphqlArgs,
        where: 'PermissionWhereInput',
        orderBy: list('PermissionOrderByWithRelationInput'),
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.PermissionFindManyArgs = parseGraphQLQuery(
          info,
          args
        );
        const permissions = await ctx.db.permission.findMany(prismaArgs);
        return permissions as any;
      },
    });

    t.field('permission', {
      type: 'Permission',
      args: {
        where: 'PermissionWhereInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.PermissionFindFirstArgs = parseGraphQLQuery(
          info,
          args
        );
        const permission = await ctx.db.permission.findFirst(prismaArgs);
        return permission as any;
      },
    });

    t.nonNull.int('permissionsCount', {
      args: {
        where: 'PermissionWhereInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.PermissionCountArgs = parseGraphQLQuery(
          info,
          args
        );
        const permissionsCount = await ctx.db.permission.count(prismaArgs);
        return permissionsCount;
      },
    });
  },
});

export const PermissionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createPermission', {
      type: 'Permission',
      args: { name: nonNull(stringArg()) },
      async resolve(root, args, ctx, info) {
        const { name } = args;
        const permission = await ctx.db.permission.create({
          data: {
            name: name,
          },
        });
        return permission as any;
      },
    });
    t.nonNull.field('updatePermission', {
      type: 'Permission',
      args: {
        id: nonNull(stringArg()),
        data: nonNull(
          inputObjectType({
            name: 'PermissionUpdateInput',
            definition(t) {
              t.string('name');
            },
          })
        ),
      },
      async resolve(root, args, ctx, info) {
        const { id, data } = args;
        const permission = await ctx.db.permission.update({
          where: {
            id: id,
          },
          data: { name: data.name ?? undefined },
        });
        return permission as any;
      },
    });
    t.field('deletePermission', {
      type: 'Permission',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { id, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery<Prisma.PermissionDeleteArgs>(
          info,
          restArgs
        );
        const permission = await ctx.db.permission.delete({
          ...prismaArgs,
          where: {
            id: id,
          },
        });
        return permission as any;
      },
    });
    t.field('deletePermissions', {
      type: 'BatchPayload',
      args: {
        ids: nonNull(list(nonNull(stringArg()))),
      },
      async resolve(root, args, ctx, info) {
        const { ids, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery<Prisma.PermissionDeleteManyArgs>(
          info,
          restArgs
        );
        const batchPayload = await ctx.db.permission.deleteMany({
          ...prismaArgs,
          where: {
            id: { in: ids },
          },
        });
        return batchPayload;
      },
    });
  },
});
