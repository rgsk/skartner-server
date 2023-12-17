import { findManyGraphqlArgs } from 'lib/graphqlUtils';
/*
model PermissionHierarchy {
  id                 String     @id @default(uuid())
  parentPermissionId String
  parentPermission   Permission @relation("Parent", fields: [parentPermissionId], references: [id])
  childPermissionId  String
  childPermission    Permission @relation("Child", fields: [childPermissionId], references: [id])
  createdAt          DateTime   @default(now())

  @@unique([parentPermissionId, childPermissionId])
}
*/

import { Prisma } from '@prisma/client';
import { db } from 'db';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import {
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';

export const PermissionHierarchyObject = objectType({
  name: 'PermissionHierarchy',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('parentPermissionId');
    t.field('parentPermission', {
      type: 'Permission',
    });
    t.nonNull.string('childPermissionId');
    t.field('childPermission', {
      type: 'Permission',
    });
    t.nonNull.field('createdAt', {
      type: 'String',
      resolve: (root: any) => root.createdAt.toISOString(),
    });
  },
});

export const PermissionHierarchyWhereInput = inputObjectType({
  name: 'PermissionHierarchyWhereInput',
  definition(t) {
    t.field('id', {
      type: 'StringFilter',
    });
    t.field('parentPermissionId', {
      type: 'StringFilter',
    });
    t.field('childPermissionId', {
      type: 'StringFilter',
    });
  },
});

export const PermissionHierarchyOrderByWithRelationInput = inputObjectType({
  name: 'PermissionHierarchyOrderByWithRelationInput',
  definition(t) {
    t.field('id', {
      type: 'SortOrder',
    });
    t.field('createdAt', {
      type: 'SortOrder',
    });
  },
});

export const PermissionHierarchyQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('permissionHierarchies', {
      type: 'PermissionHierarchy',
      args: {
        ...findManyGraphqlArgs,
        where: 'PermissionHierarchyWhereInput',
        orderBy: list('PermissionHierarchyOrderByWithRelationInput'),
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.PermissionHierarchyFindManyArgs =
          parseGraphQLQuery(info, args);
        const permissionHierarchies = await ctx.db.permissionHierarchy.findMany(
          prismaArgs
        );
        return permissionHierarchies;
      },
    });
    t.field('permissionHierarchy', {
      type: 'PermissionHierarchy',
      args: {
        where: 'PermissionHierarchyWhereInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.PermissionHierarchyFindFirstArgs =
          parseGraphQLQuery(info, args);
        const permissionHierarchy = await ctx.db.permissionHierarchy.findFirst(
          prismaArgs
        );
        return permissionHierarchy;
      },
    });
    t.nonNull.int('permissionHierarchiesCount', {
      args: {
        where: 'PermissionHierarchyWhereInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.PermissionHierarchyCountArgs =
          parseGraphQLQuery(info, args);
        const permissionHierarchiesCount =
          await ctx.db.permissionHierarchy.count(prismaArgs);
        return permissionHierarchiesCount;
      },
    });
  },
});

export const fetchParentHierarchy = async (permissionName: string) => {
  const memo: any = {};
  const helper = async (permissionName: string) => {
    if (memo[permissionName]) {
      return memo[permissionName];
    }

    const result: any = {};
    memo[permissionName] = result;

    const currentLevel = await db.permissionHierarchy.findMany({
      where: {
        childPermission: {
          name: permissionName,
        },
      },
      select: {
        parentPermission: {
          select: {
            name: true,
          },
        },
      },
    });

    await Promise.all(
      currentLevel.map(async ({ parentPermission: { name } }) => {
        result[name] = await helper(name);
      })
    );

    return result;
  };
  const result = helper(permissionName);
  return result;
};

export const fetchChildHierarchy = async (permissionName: string) => {
  const memo: any = {};
  const helper = async (permissionName: string) => {
    if (memo[permissionName]) {
      return memo[permissionName];
    }

    const result: any = {};
    memo[permissionName] = result;

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
          },
        },
      },
    });

    await Promise.all(
      currentLevel.map(async ({ childPermission: { name } }) => {
        result[name] = await helper(name);
      })
    );

    return result;
  };
  const result = helper(permissionName);
  return result;
};

export const flattenKeys = (obj: Record<string, any>) => {
  const set = new Set<string>();
  const helper = (obj: Record<string, any>) => {
    for (const key in obj) {
      set.add(key);
      helper(obj[key]);
    }
  };
  helper(obj);
  return set;
};

const checkIfChildPermissionIsParent = async ({
  permissionName,
  childPermissionName,
}: {
  permissionName: string;
  childPermissionName: string;
}) => {
  const parentHierarchy = await fetchParentHierarchy(permissionName);
  const parents = flattenKeys(parentHierarchy);
  // console.log({ permissionName, childPermissionName, parents });
  return parents.has(childPermissionName);
};

const checkIfParentPermissionIsChild = async ({
  permissionName,
  parentPermissionName,
}: {
  permissionName: string;
  parentPermissionName: string;
}) => {
  const childHierarchy = await fetchChildHierarchy(permissionName);
  const children = flattenKeys(childHierarchy);
  // console.log({ permissionName, parentPermissionName, children });
  return children.has(parentPermissionName);
};

const checkForCircularHierarchyByName = async ({
  parentPermissionName,
  childPermissionName,
}: {
  parentPermissionName: string;
  childPermissionName: string;
}) => {
  if (parentPermissionName === childPermissionName) {
    return true;
  }
  const result = await checkIfChildPermissionIsParent({
    childPermissionName: childPermissionName,
    permissionName: parentPermissionName,
  });
  // below can also be used
  // const result = await checkIfParentPermissionIsChild({
  //   permissionName: childPermissionName,
  //   parentPermissionName: parentPermissionName,
  // });
  return result;
};

const checkForCircularHierarchyByIds = async ({
  parentPermissionId,
  childPermissionId,
}: {
  parentPermissionId: string;
  childPermissionId: string;
}) => {
  if (parentPermissionId === childPermissionId) {
    return true;
  }
  const parentPermission = await db.permission.findUnique({
    where: { id: parentPermissionId },
  });
  const childPermission = await db.permission.findUnique({
    where: { id: childPermissionId },
  });
  if (!parentPermission) {
    throw new Error('parent permission id not valid');
  }
  if (!childPermission) {
    throw new Error('child permission id not valid');
  }
  const result = await checkForCircularHierarchyByName({
    parentPermissionName: parentPermission.name,
    childPermissionName: childPermission.name,
  });
  return result;
};

export const PermissionHierarchyMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createPermissionHierarchy', {
      type: 'PermissionHierarchy',
      args: {
        parentPermissionId: nonNull(stringArg()),
        childPermissionId: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { parentPermissionId, childPermissionId } = args;
        const wouldResultInCircularHierarchy =
          await checkForCircularHierarchyByIds({
            parentPermissionId,
            childPermissionId,
          });

        if (wouldResultInCircularHierarchy) {
          throw new Error(
            'operation not allowed as it would result in Circular Hierarchy'
          );
        }
        const permissionHierarchy = await ctx.db.permissionHierarchy.create({
          data: {
            parentPermissionId,
            childPermissionId,
          },
        });
        return permissionHierarchy;
      },
    });

    t.field('deletePermissionHierarchy', {
      type: 'PermissionHierarchy',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { id, ...restArgs } = args;
        const prismaArgs =
          parseGraphQLQuery<Prisma.PermissionHierarchyDeleteArgs>(
            info,
            restArgs
          );
        const permissionHierarchy = await ctx.db.permissionHierarchy.delete({
          ...prismaArgs,
          where: {
            id: id,
          },
        });
        return permissionHierarchy;
      },
    });
    t.field('deletePermissionHierarchies', {
      type: 'BatchPayload',
      args: {
        ids: nonNull(list(nonNull(stringArg()))),
      },
      async resolve(root, args, ctx, info) {
        const { ids, ...restArgs } = args;
        const prismaArgs =
          parseGraphQLQuery<Prisma.PermissionHierarchyDeleteManyArgs>(
            info,
            restArgs
          );
        const batchPayload = await ctx.db.permissionHierarchy.deleteMany({
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
