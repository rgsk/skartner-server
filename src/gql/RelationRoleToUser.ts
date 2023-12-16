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

export const RelationRoleToUserWhereInput = inputObjectType({
  name: 'RelationRoleToUserWhereInput',
  definition(t) {
    t.field('id', {
      type: 'StringFilter',
    });
    t.field('assignerId', {
      type: 'StringFilter',
    });
    t.field('roleId', {
      type: 'StringFilter',
    });
    t.field('userId', {
      type: 'StringFilter',
    });
  },
});

export const RelationRoleToUserOrderByWithRelationInput = inputObjectType({
  name: 'RelationRoleToUserOrderByWithRelationInput',
  definition(t) {
    t.field('id', {
      type: 'SortOrder',
    });
    t.field('assignedAt', {
      type: 'SortOrder',
    });
  },
});

export const RelationRoleToUserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('relationsRoleToUser', {
      type: 'RelationRoleToUser',
      args: {
        ...findManyGraphqlArgs,
        where: 'RelationRoleToUserWhereInput',
        orderBy: list('RelationRoleToUserOrderByWithRelationInput'),
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RelationRoleToUserFindManyArgs =
          parseGraphQLQuery(info, args);
        const relationsRoleToUser = await ctx.db.relationRoleToUser.findMany(
          prismaArgs
        );
        return relationsRoleToUser;
      },
    });
    t.field('relationRoleToUser', {
      type: 'RelationRoleToUser',
      args: {
        where: nonNull('RelationRoleToUserWhereInput'),
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RelationRoleToUserFindFirstArgs =
          parseGraphQLQuery(info, args);
        const relationRoleToUser = await ctx.db.relationRoleToUser.findFirst(
          prismaArgs
        );
        return relationRoleToUser;
      },
    });
    t.nonNull.int('relationsRoleToUserCount', {
      args: {
        where: 'RelationRoleToUserWhereInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RelationRoleToUserCountArgs =
          parseGraphQLQuery(info, args);
        const count = await ctx.db.relationRoleToUser.count(prismaArgs);
        return count;
      },
    });
  },
});

export const RelationRoleToUserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createRelationRoleToUser', {
      type: 'RelationRoleToUser',
      args: {
        assignerId: nonNull(stringArg()),
        roleId: nonNull(stringArg()),
        userId: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { assignerId, roleId, userId } = args;
        const relationRoleToUser = await ctx.db.relationRoleToUser.create({
          data: {
            assignerId,
            roleId,
            userId,
          },
        });
        return relationRoleToUser;
      },
    });
    t.nonNull.field('updateRelationRoleToUser', {
      type: 'RelationRoleToUser',
      args: {
        id: nonNull(stringArg()),
        data: nonNull(
          inputObjectType({
            name: 'RelationRoleToUserUpdateInput',
            definition(t) {
              t.string('assignerId');
              t.string('roleId');
              t.string('userId');
            },
          })
        ),
      },
      async resolve(root, args, ctx, info) {
        const { id, data } = args;
        const relationRoleToUser = await ctx.db.relationRoleToUser.update({
          where: { id },
          data: {
            userId: data.userId ?? undefined,
            assignerId: data.assignerId ?? undefined,
            roleId: data.roleId ?? undefined,
          },
        });
        return relationRoleToUser;
      },
    });

    t.field('deleteRelationRoleToUser', {
      type: 'RelationRoleToUser',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { id, ...restArgs } = args;
        const prismaArgs =
          parseGraphQLQuery<Prisma.RelationRoleToUserDeleteArgs>(
            info,
            restArgs
          );
        const relationRoleToUser = await ctx.db.relationRoleToUser.delete({
          ...prismaArgs,
          where: {
            id: id,
          },
        });
        return relationRoleToUser as any;
      },
    });
    t.field('deleteRelationsRoleToUser', {
      type: 'BatchPayload',
      args: {
        ids: nonNull(list(nonNull(stringArg()))),
      },
      async resolve(root, args, ctx, info) {
        const { ids, ...restArgs } = args;
        const prismaArgs =
          parseGraphQLQuery<Prisma.RelationRoleToUserDeleteManyArgs>(
            info,
            restArgs
          );
        const batchPayload = await ctx.db.relationRoleToUser.deleteMany({
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
