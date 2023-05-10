import { GreWord } from '@prisma/client';
import { Context, context } from 'context';
import DataLoader from 'dataloader';
import {
  ParsedDatesEntity,
  deriveEntityMapFromArray,
  parseEntitiesDates,
} from 'lib/generalUtils';
import openAIApi from 'lib/openAIApi';
import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { ChatCompletionRequestMessage } from 'openai';

function createGreWordsLoader(ctx: Context) {
  return new DataLoader<string, ParsedDatesEntity<GreWord>>(
    async (ids) => {
      const _greWords = await ctx.db.greWord.findMany({
        where: { id: { in: [...ids] } },
      });
      const greWords = parseEntitiesDates(_greWords);
      const idToGreWordMap = deriveEntityMapFromArray(
        greWords,
        (greWord: GreWord) => greWord.id
      );
      return ids.map((id) => idToGreWordMap.get(id));
    },
    { cache: false }
  );
}

const greWordsLoader = createGreWordsLoader(context);

export const GptPrompt = objectType({
  name: 'GptPrompt',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('input');
    t.nonNull.string('response');
    t.field('greWord', {
      type: 'GreWord',
      resolve: async (gptPrompt, args, ctx) => {
        if (!gptPrompt.greWordId) {
          return null;
        }
        return greWordsLoader.load(gptPrompt.greWordId);
      },
    });
    t.string('greWordId');
    t.nonNull.string('createdAt');
    t.nonNull.string('updatedAt');
  },
});

export const GptPromptQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('gptPrompts', {
      type: GptPrompt,
      async resolve(root, args, ctx) {
        const gptPrompts = await ctx.db.gptPrompt.findMany();
        return parseEntitiesDates(gptPrompts);
      },
    });
    t.string('sendSinglePrompt', {
      args: {
        input: nonNull(stringArg()),
      },
      async resolve(root, args, ctx) {
        const message = await sendPrompt([
          { role: 'user', content: args.input },
        ]);
        return message?.content ?? null;
      },
    });
  },
});

export const sendPrompt = async (messages: ChatCompletionRequestMessage[]) => {
  return openAIApi
    .createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
    })
    .then((res) => {
      return res.data.choices[0].message;
    })
    .catch((e) => {
      console.log(e);
    });
};
