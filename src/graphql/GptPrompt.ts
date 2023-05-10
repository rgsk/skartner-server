import { parseEntitiesDates, parseEntityDates } from 'lib/generalUtils';
import openAIApi from 'lib/openAIApi';
import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { ChatCompletionRequestMessage } from 'openai';
import { GreWord } from './GreWord';

export const GptPrompt = objectType({
  name: 'GptPrompt',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('input');
    t.nonNull.string('response');
    t.field('greWord', {
      type: GreWord,
      resolve: async (gptPrompt, args, ctx) => {
        if (!gptPrompt.greWordId) {
          return null;
        }
        const greWord = await ctx.db.greWord.findUnique({
          where: { id: gptPrompt.greWordId },
        });
        return greWord && parseEntityDates(greWord);
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
      async resolve(_root, _args, ctx) {
        const gptPrompts = await ctx.db.gptPrompt.findMany();
        return parseEntitiesDates(gptPrompts);
      },
    });
    t.string('sendSinglePrompt', {
      args: {
        input: nonNull(stringArg()),
      },
      async resolve(_root, _args, ctx) {
        const message = await sendPrompt([
          { role: 'user', content: _args.input },
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
