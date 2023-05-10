import { GptPrompt } from '@prisma/client';
import { Context, context } from 'context';
import DataLoader from 'dataloader';
import {
  ParsedDatesEntity,
  deriveEntityArrayMapFromArray,
  parseEntitiesDates,
  parseEntityDates,
} from 'lib/generalUtils';
import { extendType, nonNull, objectType, stringArg } from 'nexus';

function createGptPromptsLoader(ctx: Context) {
  return new DataLoader<string, ParsedDatesEntity<GptPrompt>[]>(
    async (ids) => {
      const _gptPrompts = await ctx.db.gptPrompt.findMany({
        where: { greWordId: { in: [...ids] } },
      });
      const gptPrompts = parseEntitiesDates(_gptPrompts);
      const idToGrePromptsMap = deriveEntityArrayMapFromArray(
        gptPrompts,
        (gptPrompt: GptPrompt) => gptPrompt.greWordId
      );
      return ids.map((id) => idToGrePromptsMap.get(id) ?? []);
    },
    { cache: false }
  );
}

const grePromptsLoader = createGptPromptsLoader(context);

export const GreWord = objectType({
  name: 'GreWord',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('spelling');
    t.nonNull.string('createdAt');
    t.nonNull.string('updatedAt');
    t.nonNull.list.field('gptPrompts', {
      type: 'GptPrompt',
      resolve: async (greWord, args, ctx) => {
        return grePromptsLoader.load(greWord.id);
      },
    });
  },
});

export const GreWordQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('greWords', {
      type: GreWord,
      async resolve(root, args, ctx) {
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
      async resolve(root, args, ctx) {
        const greWord = await ctx.db.greWord.upsert({
          create: {
            spelling: args.spelling,
            gptPrompts: {
              create: {
                input: args.promptInput,
                response: args.promptResponse,
              },
            },
          },
          where: {
            spelling: args.spelling,
          },
          update: {
            gptPrompts: {
              create: {
                input: args.promptInput,
                response: args.promptResponse,
              },
            },
          },
        });
        return parseEntityDates(greWord);
      },
    });
  },
});
