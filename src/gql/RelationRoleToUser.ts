import { Prisma } from '@prisma/client';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import { extendType, list, nonNull, objectType, stringArg } from 'nexus';

/*
model RelationRoleToUser {
  id         String   @id @default(uuid())
  roleId     String
  role       Role     @relation(fields: [roleId], references: [id])
  userId     String
  user       User     @relation(name: "User", fields: [userId], references: [id])
  assignerId String
  assigner   User     @relation(name: "Assigner", fields: [assignerId], references: [id])
  assignedAt DateTime @default(now())

  @@unique([roleId, userId])
}
*/

export const RelationRoleToUserObject = objectType({
  name: 'RelationRoleToUser',
  definition(t) {
    t.nonNull.string('id');
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
    t.list.field('relationsRoleToUser', {
      type: 'RelationRoleToUser',
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RelationRoleToUserFindManyArgs =
          parseGraphQLQuery(info, args);
        const relationsRoleToUser = await ctx.db.relationRoleToUser.findMany(
          prismaArgs
        );
        return relationsRoleToUser;
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
