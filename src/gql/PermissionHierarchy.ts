import { findManyGraphqlArgs } from 'lib/graphqlUtils';
/*
model PermissionHierarchy {
  id                 String     @id @default(uuid())
  parentPermissionId String
  parentPermission   Permission @relation("Parent", fields: [parentPermissionId], references: [id])
  childPermissionId  String
  childPermission    Permission @relation("Child", fields: [childPermissionId], references: [id])
  createdAt          DateTime   @default(now())

  @@unique([parentPermissionId, childPermissionId])
}
*/

import { Prisma } from '@prisma/client';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import {
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';

export const PermissionHierarchyObject = objectType({
  name: 'PermissionHierarchy',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('parentPermissionId');
    t.field('parentPermission', {
      type: 'Permission',
    });
    t.nonNull.string('childPermissionId');
    t.field('childPermission', {
      type: 'Permission',
    });
    t.nonNull.field('createdAt', {
      type: 'String',
      resolve: (root: any) => root.createdAt.toISOString(),
    });
  },
});

export const PermissionHierarchyWhereInput = inputObjectType({
  name: 'PermissionHierarchyWhereInput',
  definition(t) {
    t.field('id', {
      type: 'StringFilter',
    });
    t.field('parentPermissionId', {
      type: 'StringFilter',
    });
    t.field('childPermissionId', {
      type: 'StringFilter',
    });
  },
});

export const PermissionHierarchyOrderByWithRelationInput = inputObjectType({
  name: 'PermissionHierarchyOrderByWithRelationInput',
  definition(t) {
    t.field('id', {
      type: 'SortOrder',
    });
    t.field('createdAt', {
      type: 'SortOrder',
    });
  },
});

export const PermissionHierarchyQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('permissionHierarchies', {
      type: 'PermissionHierarchy',
      args: {
        ...findManyGraphqlArgs,
        where: 'PermissionHierarchyWhereInput',
        orderBy: list('PermissionHierarchyOrderByWithRelationInput'),
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.PermissionHierarchyFindManyArgs =
          parseGraphQLQuery(info, args);
        const permissionHierarchies = await ctx.db.permissionHierarchy.findMany(
          prismaArgs
        );
        return permissionHierarchies;
      },
    });
    t.field('permissionHierarchy', {
      type: 'PermissionHierarchy',
      args: {
        where: 'PermissionHierarchyWhereInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.PermissionHierarchyFindFirstArgs =
          parseGraphQLQuery(info, args);
        const permissionHierarchy = await ctx.db.permissionHierarchy.findFirst(
          prismaArgs
        );
        return permissionHierarchy;
      },
    });
    t.nonNull.int('permissionHierarchiesCount', {
      args: {
        where: 'PermissionHierarchyWhereInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.PermissionHierarchyCountArgs =
          parseGraphQLQuery(info, args);
        const permissionHierarchiesCount =
          await ctx.db.permissionHierarchy.count(prismaArgs);
        return permissionHierarchiesCount;
      },
    });
  },
});

export const PermissionHierarchyMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createPermissionHierarchy', {
      type: 'PermissionHierarchy',
      args: {
        parentPermissionId: nonNull(stringArg()),
        childPermissionId: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { parentPermissionId, childPermissionId } = args;
        const permissionHierarchy = await ctx.db.permissionHierarchy.create({
          data: {
            parentPermissionId,
            childPermissionId,
          },
        });
        return permissionHierarchy;
      },
    });
    t.field('updatePermissionHierarchy', {
      type: 'PermissionHierarchy',
      args: {
        id: nonNull(stringArg()),
        data: nonNull(
          inputObjectType({
            name: 'PermissionHierarchyUpdateInput',
            definition(t) {
              t.string('parentPermissionId');
              t.string('childPermissionId');
            },
          })
        ),
      },
      async resolve(root, args, ctx, info) {
        const { id, data } = args;
        const permissionHierarchy = await ctx.db.permissionHierarchy.update({
          where: {
            id: id,
          },
          data: {
            childPermissionId: data.childPermissionId ?? undefined,
            parentPermissionId: data.parentPermissionId ?? undefined,
          },
        });
        return permissionHierarchy;
      },
    });
    t.field('deletePermissionHierarchy', {
      type: 'PermissionHierarchy',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { id, ...restArgs } = args;
        const prismaArgs =
          parseGraphQLQuery<Prisma.PermissionHierarchyDeleteArgs>(
            info,
            restArgs
          );
        const permissionHierarchy = await ctx.db.permissionHierarchy.delete({
          ...prismaArgs,
          where: {
            id: id,
          },
        });
        return permissionHierarchy;
      },
    });
    t.field('deletePermissionHierarchies', {
      type: 'BatchPayload',
      args: {
        ids: nonNull(list(nonNull(stringArg()))),
      },
      async resolve(root, args, ctx, info) {
        const { ids, ...restArgs } = args;
        const prismaArgs =
          parseGraphQLQuery<Prisma.PermissionHierarchyDeleteManyArgs>(
            info,
            restArgs
          );
        const batchPayload = await ctx.db.permissionHierarchy.deleteMany({
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
