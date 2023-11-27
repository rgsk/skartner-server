import { Prisma } from '@prisma/client';
import { addDateFieldsDefinitions } from 'lib/graphqlUtils';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import { extendType, objectType } from 'nexus';

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

export const PermissionObject = objectType({
  name: 'Permission',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nonNull.field('meta', {
      type: 'Json',
    });
    addDateFieldsDefinitions(t);
  },
});

export const PermissionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('permissions', {
      type: 'Permission',
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.PermissionFindManyArgs = parseGraphQLQuery(
          info,
          args
        );
        const permissions = await ctx.db.permission.findMany(prismaArgs);
        return permissions;
      },
    });
  },
});
