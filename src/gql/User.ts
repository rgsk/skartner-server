import { Prisma } from '@prisma/client';
import {
  addDateFieldsDefinitions,
  findManyGraphqlArgs,
} from 'lib/graphqlUtils';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import {
  extendType,
  inputObjectType,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('email');
    t.field('meta', {
      type: 'Json',
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
    addDateFieldsDefinitions(t);
  },
});

const UserWhereInput = inputObjectType({
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

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: nonNull('User'),
      args: {
        ...findManyGraphqlArgs,
        where: UserWhereInput,
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
  },
});

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        email: nonNull(stringArg()),
        meta: 'Json',
      },
      async resolve(root, args, ctx, info) {
        const { email, meta, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery(info, restArgs);
        const user = await ctx.db.user.create({
          ...prismaArgs,
          data: {
            email: email,
            meta: meta,
          },
        });
        return user;
      },
    });
    t.field('updateUser', {
      type: 'User',
      args: {
        id: stringArg(),
        email: stringArg(),
        meta: 'Json',
      },
      async resolve(root, args, ctx, info) {
        const { id, email, meta, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery(info, restArgs);
        const user = await ctx.db.user.update({
          ...prismaArgs,
          data: {
            meta: meta,
          },
          where: {
            id,
            email,
          },
        });
        return user;
      },
    });
  },
});
