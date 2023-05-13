import { Prisma } from '@prisma/client';
import {
  StringFilter,
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

export const GreWordSearchPromptInputObject = objectType({
  name: 'GreWordSearchPromptInput',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('text');
    t.nonNull.string('userId');
    t.nonNull.field('user', {
      type: nonNull('User'),
      resolve(greWordSearchPromptInput: any) {
        // no resolver need as prisma is handling that
        return greWordSearchPromptInput.user;
      },
    }),
      addDateFieldsDefinitions(t);
  },
});

const GreWordSearchPromptInputWhereInput = inputObjectType({
  name: 'GreWordSearchPromptInputWhereInput',
  definition(t) {
    t.field('id', {
      type: StringFilter,
    });
    t.field('text', {
      type: StringFilter,
    });
    t.field('userId', {
      type: StringFilter,
    });
  },
});

export const GreWordSearchPromptInputQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('greWordSearchPromptInputs', {
      type: nonNull('GreWordSearchPromptInput'),
      args: {
        ...findManyGraphqlArgs,
        where: GreWordSearchPromptInputWhereInput,
      },
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.GreWordSearchPromptInputFindManyArgs =
          parseGraphQLQuery(info, args);
        const greWordSearchPromptInputs =
          await ctx.db.greWordSearchPromptInput.findMany(prismaArgs);
        return greWordSearchPromptInputs as any;
      },
    });
  },
});

export const GreWordSearchPromptInputMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createGreWordSearchPromptInput', {
      type: nonNull('GreWordSearchPromptInput'),
      args: {
        text: nonNull(stringArg()),
        userId: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { text, userId, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery(info, restArgs);
        const greWordSearchPromptInput =
          await ctx.db.greWordSearchPromptInput.create({
            ...prismaArgs,
            data: {
              text: text,
              userId: userId,
            },
          });
        return greWordSearchPromptInput;
      },
    });
    t.field('updateGreWordSearchPromptInput', {
      type: 'GreWordSearchPromptInput',
      args: {
        text: nonNull(stringArg()),
        id: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { text, id, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery(info, restArgs);
        const greWordSearchPromptInput =
          await ctx.db.greWordSearchPromptInput.update({
            ...prismaArgs,
            data: {
              text: text,
            },
            where: {
              id: id,
            },
          });
        return greWordSearchPromptInput;
      },
    });
    t.field('deleteGreWordSearchPromptInput', {
      type: 'GreWordSearchPromptInput',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { id, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery(info, restArgs);
        const greWordSearchPromptInput =
          await ctx.db.greWordSearchPromptInput.delete({
            ...prismaArgs,
            where: {
              id: id,
            },
          });
        return greWordSearchPromptInput;
      },
    });
  },
});
