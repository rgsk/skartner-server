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
    t.field('users', {
      type: 'UserListRelationFilter',
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
              users: { connect: { id: userId } },
            },
          });
        return greWordSearchPromptInput;
      },
    });
    t.field('updateGreWordSearchPromptInput', {
      type: 'GreWordSearchPromptInput',
      args: {
        text: stringArg(),
        connectedUserId: stringArg(),
        disconnectedUserId: stringArg(),
        id: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { text, id, connectedUserId, disconnectedUserId, ...restArgs } =
          args;
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
              users:
                connectedUserId || disconnectedUserId
                  ? {
                      connect: connectedUserId
                        ? { id: connectedUserId }
                        : undefined,
                      disconnect: disconnectedUserId
                        ? { id: disconnectedUserId }
                        : undefined,
                    }
                  : undefined,
            },
            where: {
              id: id,
            },
          });
        return greWordSearchPromptInput;
      },
    });
  },
});
