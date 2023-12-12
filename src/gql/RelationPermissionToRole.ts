import { Prisma } from '@prisma/client';
import { findManyGraphqlArgs } from 'lib/graphqlUtils';
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
    t.list.field('relationsPermissionToRole', {
      type: 'RelationPermissionToRole',
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
    t.field('deleteRelationPermissionToRole', {
      type: 'RelationPermissionToRole',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { id, ...restArgs } = args;
        const prismaArgs =
          parseGraphQLQuery<Prisma.RelationPermissionToRoleDeleteArgs>(
            info,
            restArgs
          );
        const relationPermissionToRole =
          await ctx.db.relationPermissionToRole.delete({
            ...prismaArgs,
            where: {
              id: id,
            },
          });
        return relationPermissionToRole as any;
      },
    });
    t.field('deleteRelationsPermissionToRole', {
      type: 'BatchPayload',
      args: {
        ids: nonNull(list(nonNull(stringArg()))),
      },
      async resolve(root, args, ctx, info) {
        const { ids, ...restArgs } = args;
        const prismaArgs =
          parseGraphQLQuery<Prisma.RelationPermissionToRoleDeleteManyArgs>(
            info,
            restArgs
          );
        const batchPayload = await ctx.db.relationPermissionToRole.deleteMany({
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
