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

export const GreWordSearchPromptInputObject = objectType({
  name: 'GreWordSearchPromptInput',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('text');
    addDateFieldsDefinitions(t);
    t.nonNull.field('meta', {
      type: 'Json',
    });
    t.nonNull.string('userId');
    t.nonNull.field('user', {
      type: 'User',
    });
  },
});

export const GreWordSearchPromptInputWhereInput = inputObjectType({
  name: 'GreWordSearchPromptInputWhereInput',
  definition(t) {
    t.field('id', {
      type: 'StringFilter',
    });
    t.field('text', {
      type: 'StringFilter',
    });
    t.field('userId', {
      type: 'StringFilter',
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
        where: 'GreWordSearchPromptInputWhereInput',
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
        const prismaArgs =
          parseGraphQLQuery<Prisma.GreWordSearchPromptInputCreateArgs>(
            info,
            restArgs
          );
        const greWordSearchPromptInput =
          await ctx.db.greWordSearchPromptInput.create({
            ...prismaArgs,
            data: {
              text: text,
              userId: userId,
            },
          });
        return greWordSearchPromptInput as any;
      },
    });
    t.field('updateGreWordSearchPromptInput', {
      type: 'GreWordSearchPromptInput',
      args: {
        text: stringArg(),
        id: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { text, id, ...restArgs } = args;
        const prismaArgs =
          parseGraphQLQuery<Prisma.GreWordSearchPromptInputArgs>(
            info,
            restArgs
          );
        const greWordSearchPromptInput =
          await ctx.db.greWordSearchPromptInput.update({
            ...prismaArgs,
            data: {
              text: text ?? undefined,
            },
            where: {
              id: id,
            },
          });
        return greWordSearchPromptInput as any;
      },
    });
    t.field('deleteGreWordSearchPromptInput', {
      type: 'GreWordSearchPromptInput',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { id, ...restArgs } = args;
        const prismaArgs =
          parseGraphQLQuery<Prisma.GreWordSearchPromptInputArgs>(
            info,
            restArgs
          );
        const greWordSearchPromptInput =
          await ctx.db.greWordSearchPromptInput.delete({
            ...prismaArgs,
            where: {
              id: id,
            },
          });
        return greWordSearchPromptInput as any;
      },
    });
  },
});
