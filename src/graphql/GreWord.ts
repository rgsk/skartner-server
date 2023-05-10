import { parseEntitiesDates, parseEntityDates } from 'lib/generalUtils';
import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { GptPrompt } from './GptPrompt';

export const GreWord = objectType({
  name: 'GreWord',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('spelling');
    t.nonNull.string('createdAt');
    t.nonNull.string('updatedAt');
    t.nonNull.list.field('gptPrompts', {
      type: GptPrompt,
      resolve: async (parent, args, ctx) => {
        const gptPrompts = await ctx.db.gptPrompt.findMany({
          where: { greWordId: parent.id },
        });
        return parseEntitiesDates(gptPrompts);
      },
    });
  },
});

export const GreWordQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('greWords', {
      type: GreWord,
      async resolve(_root, _args, ctx) {
        const greWords = await ctx.db.greWord.findMany();
        return parseEntitiesDates(greWords);
      },
    });
  },
});

export const GreWordMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createGreWord', {
      type: GreWord,
      args: {
        spelling: nonNull(stringArg()),
        promptInput: nonNull(stringArg()),
        promptResponse: nonNull(stringArg()),
      },
      async resolve(_root, _args, ctx) {
        const greWord = await ctx.db.greWord.upsert({
          create: {
            spelling: _args.spelling,
            gptPrompts: {
              create: {
                input: _args.promptInput,
                response: _args.promptResponse,
              },
            },
          },
          where: {
            spelling: _args.spelling,
          },
          update: {
            gptPrompts: {
              create: {
                input: _args.promptInput,
                response: _args.promptResponse,
              },
            },
          },
        });
        return parseEntityDates(greWord);
      },
    });
  },
});
