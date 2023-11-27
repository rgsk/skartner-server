import { Prisma } from '@prisma/client';
import { addDateFieldsDefinitions } from 'lib/graphqlUtils';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import { extendType, objectType } from 'nexus';

/*
model Role {
  id                             String                     @id @default(uuid())
  name                           String                     @unique
  meta                           Json                       @default("{}")
  createdAt                      DateTime                   @default(now())
  updatedAt                      DateTime                   @updatedAt
  relationRoleToUserAsRole       RelationRoleToUser[]
  relationPermissionToRoleAsRole RelationPermissionToRole[]

  @@map("Roles")
}
*/

export const RoleObject = objectType({
  name: 'Role',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nonNull.field('meta', {
      type: 'Json',
    });
    addDateFieldsDefinitions(t);
  },
});

export const RoleQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('roles', {
      type: 'Role',
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RoleFindManyArgs = parseGraphQLQuery(
          info,
          args
        );
        const roles = await ctx.db.role.findMany(prismaArgs);
        return roles;
      },
    });
  },
});
