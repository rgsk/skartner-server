import { Prisma, User } from '@prisma/client';
import { millisecondsInMinute } from 'date-fns';
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
import { sendCommunicationOnSignupQueue } from 'queues';

export const UserMetaParsedJsonValue = objectType({
  name: 'UserMetaParsedJsonValue',
  definition(t) {
    t.string('defaultGreWordSearchPromptInput');
    t.boolean('showDefaultGreWordSearchPromptInputs');
  },
});

export const UserMetaParsedJsonValueInput = inputObjectType({
  name: 'UserMetaParsedJsonValueInput',
  definition(t) {
    t.string('defaultGreWordSearchPromptInput');
    t.boolean('showDefaultGreWordSearchPromptInputs');
  },
});

export const UserObject = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('email');
    t.nonNull.field('meta', {
      type: 'UserMetaParsedJsonValue',
      resolve(_user: any) {
        const user: User = _user;
        return user.meta as any;
      },
    });
    t.nonNull.list.field('greWordSearchPromptInputs', {
      type: nonNull('GreWordSearchPromptInput'),
      resolve(user: any) {
        return user.greWordSearchPromptInputs;
      },
    });
    t.nonNull.list.field('greWords', {
      type: nonNull('GreWord'),
      resolve(user: any) {
        return user.greWords;
      },
    });
    t.nonNull.list.field('gptPrompts', {
      type: nonNull('GptPrompt'),
      resolve(user: any) {
        return user.gptPrompts;
      },
    });
    t.nonNull.list.nonNull.field('greWordTags', {
      type: 'GreWordTag',
      resolve(user: any) {
        return user.greWordTags;
      },
    });
    addDateFieldsDefinitions(t);
  },
});

export const UserWhereInput = inputObjectType({
  name: 'UserWhereInput',
  definition(t) {
    t.field('id', {
      type: 'StringFilter',
    });
    t.field('email', {
      type: 'StringFilter',
    });
  },
});

export const UserListRelationFilter = inputObjectType({
  name: 'UserListRelationFilter',
  definition(t) {
    t.field('every', {
      type: 'UserWhereInput',
    });
    t.field('some', {
      type: 'UserWhereInput',
    });
    t.field('none', {
      type: 'UserWhereInput',
    });
  },
});

export const UserOrderByWithRelationInput = inputObjectType({
  name: 'UserOrderByWithRelationInput',
  definition(t) {
    t.field('id', {
      type: 'SortOrder',
    });
    t.field('email', {
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

const getPermissionSelect = (userId: string) => {
  // when editing result object
  // uncomment below line
  // const result: Prisma.PermissionSelect =  {
  const result = {
    id: true,
    name: true,
    relationPermissionToUserAsPermission: {
      where: { userId },
      select: {
        isAllowed: true,
      },
    },
    relationPermissionToRoleAsPermission: {
      select: {
        isAllowed: true,
        role: {
          select: {
            name: true,
          },
        },
      },
      where: {
        role: {
          relationRoleToUserAsRole: {
            some: {
              userId,
            },
          },
        },
      },
    },
  };
  return result;
};

const getProps = (permission: {
  id: string;
  name: string;
  relationPermissionToRoleAsPermission: {
    role: {
      name: string;
    };
    isAllowed: boolean | null;
  }[];
  relationPermissionToUserAsPermission: {
    isAllowed: boolean | null;
  }[];
}) => {
  let falseExists = false;
  let trueExists = false;
  const props: any = {};
  const pToUAllowed =
    permission.relationPermissionToUserAsPermission[0]?.isAllowed;
  props['permission'] = {
    isAllowed: pToUAllowed,
  };
  trueExists = pToUAllowed === true;
  falseExists = pToUAllowed === false;

  props['roles'] = {};
  for (const relation of permission.relationPermissionToRoleAsPermission) {
    props['roles'][relation.role.name] = {
      isAllowed: relation.isAllowed,
    };
    trueExists = relation.isAllowed === true;
    falseExists = relation.isAllowed === false;
  }
  if (falseExists) {
    props['effectiveIsAllowed'] = false;
  } else if (trueExists) {
    props['effectiveIsAllowed'] = true;
  } else if (
    permission.relationPermissionToUserAsPermission.length ||
    permission.relationPermissionToRoleAsPermission.length
  ) {
    props['effectiveIsAllowed'] = null;
  }
  return props;
};

const fetchChildHierarchyForUser = async (
  permissionName: string,
  userId: string
) => {
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
          select: getPermissionSelect(userId),
        },
      },
    });

    await Promise.all(
      currentLevel.map(async ({ childPermission }) => {
        const childProps = await helper(childPermission.name);
        const extraProps = getProps(childPermission);
        for (const key in extraProps) {
          childProps[key] = (extraProps as any)[key];
        }
        result[childPermission.name] = childProps;
      })
    );

    return result;
  };
  const result = helper(permissionName);
  return result;
};

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: nonNull('User'),
      args: {
        ...findManyGraphqlArgs,
        where: 'UserWhereInput',
        orderBy: list('UserOrderByWithRelationInput'),
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.UserFindManyArgs = parseGraphQLQuery(
          info,
          args
        );
        const users = await ctx.db.user.findMany(prismaArgs);
        return users;
      },
    });
    t.field('user', {
      type: 'User',
      args: {
        where: nonNull('UserWhereInput'),
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.UserFindUniqueArgs = parseGraphQLQuery(
          info,
          args
        );
        const user = await ctx.db.user.findFirst(prismaArgs);
        return user;
      },
    });
    t.nonNull.int('usersCount', {
      args: {
        where: UserWhereInput,
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.UserCountArgs = parseGraphQLQuery(info, args);
        const usersCount = await ctx.db.user.count(prismaArgs);
        return usersCount;
      },
    });
    t.field('userPermissionsGraph', {
      type: 'Json',
      args: {
        where: 'UserWhereInput',
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.UserFindFirstArgs = parseGraphQLQuery(
          info,
          args
        );
        const user = await ctx.db.user.findFirst(prismaArgs);
        if (user) {
          const roles = await ctx.db.role.findMany({
            where: {
              relationRoleToUserAsRole: {
                some: {
                  userId: user.id,
                },
              },
            },
            select: {
              id: true,
            },
          });
          const permissions = await ctx.db.permission.findMany({
            where: {
              permissionHierarchyAsChild: {
                none: {
                  id: {
                    startsWith: '',
                  },
                },
              },
              OR: [
                {
                  relationPermissionToRoleAsPermission: {
                    some: {
                      roleId: {
                        in: roles.map((r) => r.id),
                      },
                    },
                  },
                },
                {
                  relationPermissionToUserAsPermission: {
                    some: {
                      userId: user.id,
                    },
                  },
                },
              ],
            },
            select: getPermissionSelect(user.id),
          });

          const result: any = {};
          await Promise.all(
            permissions.map(async (permission) => {
              const childHierarchy = await fetchChildHierarchyForUser(
                permission.name,
                user.id
              );
              result[permission.name] = {
                ...getProps(permission),
                ...childHierarchy,
              };
            })
          );

          return result;
        } else {
          throw new Error('user not found');
        }
      },
    });
  },
});

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: nonNull('User'),
      args: {
        email: nonNull(stringArg()),
        meta: 'UserMetaParsedJsonValueInput',
      },
      async resolve(root, args, ctx, info) {
        const { email, meta, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery<Prisma.UserCreateArgs>(
          info,
          restArgs
        );
        const user = await ctx.db.user.create({
          ...prismaArgs,
          data: {
            email: email,
            meta: meta ?? undefined,
          },
        });
        sendCommunicationOnSignupQueue.add(
          { user },
          { delay: millisecondsInMinute }
        );
        return user;
      },
    });
    t.field('updateUser', {
      type: 'User',
      args: {
        id: stringArg(),
        email: stringArg(),
        meta: 'UserMetaParsedJsonValueInput',
      },
      async resolve(root, args, ctx, info) {
        const { id, email, meta, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery<Prisma.UserUpdateArgs>(
          info,
          restArgs
        );
        const user = await ctx.db.user.update({
          ...prismaArgs,
          data: {
            meta: meta ?? undefined,
          },
          where: {
            id: id ?? undefined,
            email: email ?? undefined,
          },
        });
        return user;
      },
    });
  },
});
