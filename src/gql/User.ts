import { Prisma, User } from '@prisma/client';
import { millisecondsInMinute } from 'date-fns';
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

export const UserWhereUniqueInput = inputObjectType({
  name: 'UserWhereUniqueInput',
  definition(t) {
    t.string('id');
    t.string('email');
  },
});

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
        where: nonNull('UserWhereUniqueInput'),
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.UserFindUniqueArgs = parseGraphQLQuery(
          info,
          args
        );
        const user = await ctx.db.user.findUnique(prismaArgs);
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
  },
});

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'User',
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
