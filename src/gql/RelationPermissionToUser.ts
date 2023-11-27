import { Prisma } from '@prisma/client';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import { extendType, objectType } from 'nexus';

/*
model RelationPermissionToUser {
  permissionId String
  permission   Permission @relation(fields: [permissionId], references: [id])
  userId       String
  user         User       @relation(name: "User", fields: [userId], references: [id])
  granterId    String
  granter      User       @relation(name: "Granter", fields: [granterId], references: [id])
  isAllowed    Boolean?
  grantedAt    DateTime   @default(now())

  @@id([permissionId, userId])
}
*/

export const RelationPermissionToUserObject = objectType({
  name: 'RelationPermissionToUser',
  definition(t) {
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

export const RelationPermissionToUserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('relationPermissionToUsers', {
      type: 'RelationPermissionToUser',
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RelationPermissionToUserFindManyArgs =
          parseGraphQLQuery(info, args);
        const relationPermissionToUsers =
          await ctx.db.relationPermissionToUser.findMany(prismaArgs);
        return relationPermissionToUsers;
      },
    });
  },
});
