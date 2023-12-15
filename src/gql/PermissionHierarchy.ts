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
import { extendType, inputObjectType, list, objectType } from 'nexus';

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
    t.list.field('permissionHierarchies', {
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
  },
});
