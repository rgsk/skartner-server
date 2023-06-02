import { Prisma, User } from '@prisma/client';
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
        meta: 'UserMetaParsedJsonValueInput',
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
        meta: 'UserMetaParsedJsonValueInput',
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
