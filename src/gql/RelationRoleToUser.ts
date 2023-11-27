import { Prisma } from '@prisma/client';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import { extendType, objectType } from 'nexus';

/*
model RelationRoleToUser {
  roleId     String
  role       Role     @relation(fields: [roleId], references: [id])
  userId     String
  user       User     @relation(name: "User", fields: [userId], references: [id])
  assignedAt DateTime @default(now())
  assignerId String
  assigner   User     @relation(name: "Assigner", fields: [assignerId], references: [id])

  @@id([roleId, userId])
}
*/

export const RelationRoleToUserObject = objectType({
  name: 'RelationRoleToUser',
  definition(t) {
    t.nonNull.string('roleId');
    t.field('role', {
      type: 'Role',
    });
    t.nonNull.string('userId');
    t.field('user', {
      type: 'User',
    });
    t.nonNull.string('assignerId');
    t.field('assigner', {
      type: 'User',
    });
    t.nonNull.field('assignedAt', {
      type: 'String',
      resolve: (root: any) => root.assignedAt.toISOString(),
    });
  },
});

export const RelationRoleToUserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('relationRoleToUsers', {
      type: 'RelationRoleToUser',
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RelationRoleToUserFindManyArgs =
          parseGraphQLQuery(info, args);
        const relationRoleToUsers = await ctx.db.relationRoleToUser.findMany(
          prismaArgs
        );
        return relationRoleToUsers;
      },
    });
  },
});
