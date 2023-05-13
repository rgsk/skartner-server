import { Prisma } from '@prisma/client';
import {
  addDateFieldsDefinitions,
  findManyGraphqlArgs,
} from 'lib/graphqlUtils';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import { extendType, nonNull, objectType, stringArg } from 'nexus';

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

export const GreWordSearchPromptInputQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('greWordSearchPromptInputs', {
      type: nonNull('GreWordSearchPromptInput'),
      args: {
        ...findManyGraphqlArgs,
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
      type: 'GreWordSearchPromptInput',
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
  },
});
