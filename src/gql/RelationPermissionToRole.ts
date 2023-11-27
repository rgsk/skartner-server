import { Prisma } from '@prisma/client';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import { extendType, objectType } from 'nexus';

/*
model RelationPermissionToRole {
  permissionId String
  permission   Permission @relation(fields: [permissionId], references: [id])
  roleId       String
  role         Role       @relation(fields: [roleId], references: [id])
  granterId    String
  granter      User       @relation(fields: [granterId], references: [id])
  isAllowed    Boolean?

  @@id([permissionId, roleId])
}
*/

export const RelationPermissionToRoleObject = objectType({
  name: 'RelationPermissionToRole',
  definition(t) {
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

export const RelationPermissionToRoleQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('relationPermissionToRoles', {
      type: 'RelationPermissionToRole',
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RelationPermissionToRoleFindManyArgs =
          parseGraphQLQuery(info, args);
        const relationPermissionToRoles =
          await ctx.db.relationPermissionToRole.findMany(prismaArgs);
        return relationPermissionToRoles;
      },
    });
  },
});
