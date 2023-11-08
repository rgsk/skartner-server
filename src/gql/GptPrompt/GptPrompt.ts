import { Cache, GreWord, Prisma } from '@prisma/client';
import { sqltag } from '@prisma/client/runtime';
import DataLoader from 'dataloader';
import { db } from 'db';
import cacheValue from 'lib/cache/cacheValue';
import { deriveEntityMapFromArray, randomBetween } from 'lib/generalUtils';
import {
  addDateFieldsDefinitions,
  findManyGraphqlArgs,
} from 'lib/graphqlUtils';
import openAIApi from 'lib/openAIApi';
import parseGraphQLQuery from 'lib/parseGraphQLQuery/parseGraphQLQuery';
import {
  booleanArg,
  extendType,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { ChatCompletionRequestMessage } from 'openai';
import { NexusGenObjects } from '../../../nexus-typegen';
import { extractWord } from './GptPromptUtils';

function createGreWordsLoader() {
  return new DataLoader<string, GreWord>(
    async (ids) => {
      const greWords = await db.greWord.findMany({
        where: { id: { in: [...ids] } },
      });
      const idToGreWordMap = deriveEntityMapFromArray(
        greWords,
        (greWord: GreWord) => greWord.id
      );
      console.log({ greWordsLoaderIds: ids });
      return ids.map((id) => idToGreWordMap.get(id));
    },
    { cache: false }
  );
}

const greWordsLoader = createGreWordsLoader();

export const GptPromptObject = objectType({
  name: 'GptPrompt',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('input');
    t.nonNull.string('response');
    t.string('editedResponse');

    t.field('greWord', {
      type: 'GreWord',
      resolve: async (gptPrompt: any, args, ctx) => {
        if (gptPrompt.greWord) {
          return gptPrompt.greWord;
        }
        if (!gptPrompt.greWordId) {
          return null;
        }
        return greWordsLoader.load(gptPrompt.greWordId);
      },
    });
    t.string('greWordId');
    t.field('user', {
      type: 'User',
    });
    t.string('userId');
    t.nonNull.field('meta', {
      type: 'Json',
    });
    addDateFieldsDefinitions(t);
  },
});

export const SendSinglePromptResponseObject = objectType({
  name: 'SendSinglePromptResponse',
  definition(t) {
    t.string('result');
    t.int('resultIndex');
    t.string('error');
    t.nonNull.int('totalResultsInCache');
  },
});

export const WordAndResponsesObject = objectType({
  name: 'WordAndResponses',
  definition(t) {
    t.nonNull.string('word');
    t.nonNull.list.string('responses');
  },
});

export const WordsCountForGptPromptsObject = objectType({
  name: 'WordsCountForGptPrompts',
  definition(t) {
    t.nonNull.string('prompt');
    t.nonNull.int('count');
  },
});

export const GptPromptQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('gptPrompts', {
      type: 'GptPrompt',
      args: findManyGraphqlArgs,
      async resolve(root, args, ctx, info) {
        const prismaArgs: Prisma.GptPromptFindManyArgs = parseGraphQLQuery(
          info,
          args
        );
        const gptPrompts = await ctx.db.gptPrompt.findMany(prismaArgs);
        return gptPrompts;
      },
    });
    t.nonNull.field('sendSinglePrompt', {
      type: 'SendSinglePromptResponse',
      args: {
        input: nonNull(stringArg()),
        skipCache: booleanArg(),
        indexesReturned: list(nonNull(intArg())),
        resultIndexFromCache: intArg(),
      },
      async resolve(root, args, ctx) {
        const { input, skipCache, indexesReturned, resultIndexFromCache } =
          args;
        const result = await cacheValue<
          NexusGenObjects['SendSinglePromptResponse']
        >(
          'db',
          {
            key: {
              query: 'sendSinglePrompt',
              args: {
                input,
              },
            },
            getValue: async (previousCachedValue) => {
              const message = await sendPrompt([
                { role: 'user', content: input },
              ]);
              const result = message?.content ?? null;
              const idx =
                previousCachedValue && previousCachedValue.results
                  ? previousCachedValue.results.length
                  : 0;
              return {
                result: result,
                resultIndex: idx,
                totalResultsInCache: idx + 1,
              };
            },
            getFromCache: (cachedValue) => {
              const len = cachedValue.results.length;
              if (typeof resultIndexFromCache === 'number') {
                if (resultIndexFromCache >= 0 && resultIndexFromCache < len) {
                  return {
                    result: cachedValue.results[resultIndexFromCache],
                    resultIndex: resultIndexFromCache,
                    totalResultsInCache: len,
                  };
                } else {
                  return {
                    error: `"resultIndexFromCache": ${resultIndexFromCache} index is not valid min: 0, max: ${
                      len - 1
                    }`,
                    totalResultsInCache: len,
                  };
                }
              }
              const idx = randomBetween(
                0,
                len - 1,
                indexesReturned ?? undefined
              );
              if (idx === null) {
                return {
                  error: 'no more results in cache',
                  totalResultsInCache: len,
                };
              } else {
                return {
                  result: cachedValue.results[idx],
                  resultIndex: idx,
                  totalResultsInCache: len,
                };
              }
            },
            setInCache: (value, previousCachedValue) => {
              if (previousCachedValue) {
                return {
                  results: [...previousCachedValue.results, value.result],
                };
              } else {
                return {
                  results: [value.result],
                };
              }
            },
          },
          {
            disabled: !!skipCache,
            updateCacheWhileDisabled: true,
          }
        );
        return result;
      },
    });
    t.nonNull.list.field('wordsAndResponsesForPrompt', {
      type: nonNull('WordAndResponses'),
      args: {
        prompt: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { prompt } = args;

        const promptLike = prompt.replaceAll('{word}', '%');
        const caches = await ctx.db.$queryRaw<Cache[]>(sqltag`
              SELECT * FROM "Cache"
              WHERE 
              key->>'query' = 'sendSinglePrompt'
              AND
              key->'args'->>'input' LIKE ${promptLike}
        `);
        return caches.map((cache) => {
          const word = extractWord(prompt, (cache.key as any).args.input)!;
          const responses = (cache.value as any).results;
          return {
            word: word,
            responses: responses,
          };
        });
      },
    });
    t.nonNull.list.field('wordsCountForGptPrompts', {
      type: nonNull('WordsCountForGptPrompts'),
      args: {
        prompts: nonNull(list(nonNull(stringArg()))),
      },
      async resolve(root, args, ctx, info) {
        const { prompts } = args;
        const whereFilter = prompts
          .map((prompt) => `input like '${prompt.replaceAll('{word}', '%')}'`)
          .join(' or ');
        // whereFilter
        /*
          input like 'meaning of word %, and slang meaning of word %, also give synonyms'
          or 
          input like 'one for sde %'
        */
        const queryResult = await ctx.db.$queryRawUnsafe<{ input: string }[]>(`
          select input from 
          (select key->'args'->>'input' as input from "Cache" 
          WHERE key->>'query' = 'sendSinglePrompt') as subquery
          where 
          (
            ${whereFilter}
          )
    `);
        // queryResult
        /*
        [
          {
            input: 'meaning of word good, and slang meaning of word good, also give synonyms'
          },
          {
            input: 'meaning of word joker, and slang meaning of word joker, also give synonyms'
          },
          { input: 'one for sde joker' },
          {
            input: 'meaning of word ok, and slang meaning of word ok, also give synonyms'
          },
          { input: 'one for sde ok' },
          { input: 'one for sde low' },
          {
            input: 'meaning of word deployment, and slang meaning of word deployment, also give synonyms'
          }
        ]
        */
        const promptToCountMap: Record<string, number> = {};
        for (const prompt of prompts) {
          const regexPattern = prompt.replaceAll('{word}', '.*');
          const regex = new RegExp(`^${regexPattern}$`);
          let count = 0;
          for (const { input } of queryResult) {
            if (regex.test(input)) {
              count += 1;
            }
          }
          promptToCountMap[prompt] = count;
        }
        /*
        {
          promptToCountMap: {
            'meaning of word {word}, and slang meaning of word {word}, also give synonyms': 4,
            'one for sde {word}': 3
          }
        }
        */
        const result = Object.entries(promptToCountMap).map(
          ([prompt, count]) => ({ prompt, count })
        );
        /*
         {
            result: [
              {
                prompt: 'meaning of word {word}, and slang meaning of word {word}, also give synonyms',
                count: 4
              },
              { prompt: 'one for sde {word}', count: 3 }
            ]
          }
         */
        return result;
      },
    });
  },
});

export const GptPromptMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteGptPrompt', {
      type: 'GptPrompt',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { id, ...restArgs } = args;
        const prismaArgs: Prisma.GptPromptDeleteArgs = parseGraphQLQuery(
          info,
          restArgs
        );
        const gptPrompt = await ctx.db.gptPrompt.delete({
          ...prismaArgs,
          where: {
            id: id,
          },
        });
        return gptPrompt;
      },
    });
    t.field('createGptPrompt', {
      type: nonNull('GptPrompt'),
      args: {
        input: nonNull(stringArg()),
        response: nonNull(stringArg()),
        greWordId: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { input, response, greWordId, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery<Prisma.GptPromptCreateArgs>(
          info,
          restArgs
        );
        const gptPrompt = await ctx.db.gptPrompt.create({
          ...prismaArgs,
          data: {
            input: input,
            response: response,
            greWordId: greWordId,
          },
        });
        // creation of gptPrompt updates the greWord updatedAt
        await ctx.db.greWord.update({
          where: { id: greWordId },
          data: { updatedAt: new Date() },
        });
        return gptPrompt;
      },
    });
    t.field('updateGptPrompt', {
      type: 'GptPrompt',
      args: {
        id: nonNull(stringArg()),
        editedResponse: stringArg(),
      },
      async resolve(root, args, ctx, info) {
        const { id, editedResponse, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery<Prisma.GptPromptUpdateArgs>(
          info,
          restArgs
        );
        const gptPrompt = await ctx.db.gptPrompt.update({
          ...prismaArgs,
          where: {
            id: id,
          },
          data: {
            editedResponse,
          },
        });
        return gptPrompt;
      },
    });
  },
});

export const sendPrompt = async (messages: ChatCompletionRequestMessage[]) => {
  const result = await openAIApi.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });
  return result.data.choices[0].message;
};
