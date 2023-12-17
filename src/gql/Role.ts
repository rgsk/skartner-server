import { Prisma } from '@prisma/client';
import { db } from 'db';
import {
  addDateFieldsDefinitions,
  findManyGraphqlArgs,
} from 'lib/graphqlUtils';
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
    t.nonNull.list.nonNull.field('relationRoleToUserAsRole', {
      type: 'RelationRoleToUser',
    });
    t.nonNull.list.nonNull.field('relationPermissionToRoleAsRole', {
      type: 'RelationPermissionToRole',
    });
  },
});

export const RoleWhereInput = inputObjectType({
  name: 'RoleWhereInput',
  definition(t) {
    t.field('id', {
      type: 'StringFilter',
    });
    t.field('name', {
      type: 'StringFilter',
    });
  },
});

export const RoleOrderByWithRelationInput = inputObjectType({
  name: 'RoleOrderByWithRelationInput',
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
});

export const fetchChildHierarchyForRole = async (
  permissionName: string,
  roleId: string
) => {
  const memo: any = {};
  const helper = async (permissionName: string) => {
    if (memo[permissionName]) {
      return memo[permissionName];
    }
    const currentLevel = await db.permissionHierarchy.findMany({
      where: {
        parentPermission: {
          name: permissionName,
        },
      },
      select: {
        childPermission: {
          select: {
            name: true,
            relationPermissionToRoleAsPermission: {
              where: { roleId: roleId },
              select: {
                isAllowed: true,
              },
            },
          },
        },
      },
    });
    const result: any = {};
    for (const {
      childPermission: { name, relationPermissionToRoleAsPermission },
    } of currentLevel) {
      result[name] = {
        ...relationPermissionToRoleAsPermission[0],
        ...(await helper(name)),
      };
    }
    memo[permissionName] = result;
    return result;
  };
  const result = helper(permissionName);
  return result;
};

export const RoleQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('roles', {
      type: 'Role',
      args: {
        ...findManyGraphqlArgs,
        where: 'RoleWhereInput',
        orderBy: list('RoleOrderByWithRelationInput'),
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RoleFindManyArgs = parseGraphQLQuery(
          info,
          args
        );
        const roles = await ctx.db.role.findMany(prismaArgs);
        return roles as any;
      },
    });
    t.field('role', {
      type: 'Role',
      args: {
        where: 'RoleWhereInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RoleFindFirstArgs = parseGraphQLQuery(
          info,
          args
        );
        const role = await ctx.db.role.findFirst(prismaArgs);
        return role as any;
      },
    });
    t.nonNull.int('rolesCount', {
      args: {
        where: 'RoleWhereInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RoleCountArgs = parseGraphQLQuery(info, args);
        const rolesCount = await ctx.db.role.count(prismaArgs);
        return rolesCount;
      },
    });
    t.field('rolePermissionsGraph', {
      type: 'Json',
      args: {
        where: 'RoleWhereInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.RoleFindFirstArgs = parseGraphQLQuery(
          info,
          args
        );
        const role = await ctx.db.role.findFirst(prismaArgs);
        if (role) {
          const permissions = await ctx.db.permission.findMany({
            where: {
              relationPermissionToRoleAsPermission: {
                some: {
                  roleId: role.id,
                },
              },
            },
            select: {
              id: true,
              name: true,
              relationPermissionToRoleAsPermission: {
                where: { roleId: role.id },
                select: {
                  isAllowed: true,
                },
              },
            },
          });
          const permissionHierarchies =
            await ctx.db.permissionHierarchy.findMany({
              where: {
                childPermissionId: {
                  in: permissions.map((p) => p.id),
                },
              },
              select: {
                childPermissionId: true,
              },
            });

          const result: any = {};
          await Promise.all(
            permissions.map(async (permission) => {
              const isChild = permissionHierarchies.some(
                (ph) => ph.childPermissionId === permission.id
              );
              if (!isChild) {
                const childHierarchy = await fetchChildHierarchyForRole(
                  permission.name,
                  role.id
                );
                result[permission.name] = {
                  ...permission.relationPermissionToRoleAsPermission[0],
                  ...childHierarchy,
                };
              }
            })
          );

          return result;
        } else {
          throw new Error('role not found');
        }
      },
    });
  },
});

export const RoleMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createRole', {
      type: 'Role',
      args: { name: nonNull(stringArg()) },
      async resolve(root, args, ctx, info) {
        const { name } = args;
        const role = await ctx.db.role.create({
          data: {
            name: name,
          },
        });
        return role as any;
      },
    });
    t.nonNull.field('updateRole', {
      type: 'Role',
      args: {
        id: nonNull(stringArg()),
        data: nonNull(
          inputObjectType({
            name: 'RoleUpdateInput',
            definition(t) {
              t.string('name');
            },
          })
        ),
      },
      async resolve(root, args, ctx, info) {
        const { id, data } = args;
        const role = await ctx.db.role.update({
          where: {
            id: id,
          },
          data: { name: data.name ?? undefined },
        });
        return role as any;
      },
    });
    t.field('deleteRole', {
      type: 'Role',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { id, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery<Prisma.RoleDeleteArgs>(
          info,
          restArgs
        );
        const role = await ctx.db.role.delete({
          ...prismaArgs,
          where: {
            id: id,
          },
        });
        return role as any;
      },
    });
    t.field('deleteRoles', {
      type: 'BatchPayload',
      args: {
        ids: nonNull(list(nonNull(stringArg()))),
      },
      async resolve(root, args, ctx, info) {
        const { ids, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery<Prisma.RoleDeleteManyArgs>(
          info,
          restArgs
        );
        const batchPayload = await ctx.db.role.deleteMany({
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
