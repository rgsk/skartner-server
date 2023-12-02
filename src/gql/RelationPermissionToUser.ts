import { Prisma } from '@prisma/client';
import { findManyGraphqlArgs } from 'lib/graphqlUtils';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import { extendType, inputObjectType, list, objectType } from 'nexus';

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
    t.list.field('relationsPermissionToUser', {
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
