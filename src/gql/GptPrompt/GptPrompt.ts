import { GreWord, Prisma } from '@prisma/client';
import DataLoader from 'dataloader';
import { db } from 'db';
import { GraphQLError } from 'graphql';
import { deriveEntityMapFromArray, randomBetween } from 'lib/generalUtils';
import {
  addDateFieldsDefinitions,
  findManyGraphqlArgs,
} from 'lib/graphqlUtils';
import openAI from 'lib/openAI';
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
import { ChatCompletionMessageParam } from 'openai/resources';

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
    t.nonNull.field('cacheResponse', {
      type: 'CacheResponse',
      resolve: async (root: any, args, ctx) => {
        return root.cacheResponse;
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

export const CachePromptObject = objectType({
  name: 'CachePrompt',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('text');
    t.nonNull.field('meta', {
      type: 'Json',
    });
    addDateFieldsDefinitions(t);

    t.nonNull.list.nonNull.field('cacheResponses', {
      type: 'CacheResponse',
    });
  },
});

export const CacheWordObject = objectType({
  name: 'CacheWord',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('text');
    t.nonNull.field('meta', {
      type: 'Json',
    });
    addDateFieldsDefinitions(t);
    t.nonNull.list.nonNull.field('cacheResponses', {
      type: 'CacheResponse',
    });
  },
});

export const CacheResponseObject = objectType({
  name: 'CacheResponse',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('text');

    t.nonNull.field('meta', {
      type: 'Json',
    });
    addDateFieldsDefinitions(t);

    t.nonNull.field('cachePrompt', {
      type: 'CachePrompt',
      resolve: async (cacheResponse: any, args, ctx) => {
        return cacheResponse.cachePrompt;
      },
    });

    t.nonNull.field('cacheWord', {
      type: 'CacheWord',
      resolve: async (cacheResponse: any, args, ctx) => {
        return cacheResponse.cacheWord;
      },
    });

    t.nonNull.list.nonNull.field('gptPrompts', {
      type: 'GptPrompt',
    });
  },
});

export const SendSinglePromptResponseObject = objectType({
  name: 'SendSinglePromptResponse',
  definition(t) {
    t.nonNull.string('result');
    t.nonNull.int('resultIndex');
    t.nonNull.int('totalResultsInCache');
    t.nonNull.string('cacheResponseId');
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
        prompt: nonNull(stringArg()),
        word: nonNull(stringArg()),
        skipCache: booleanArg(),
        indexesReturned: list(nonNull(intArg())),
        resultIndexFromCache: intArg(),
      },
      async resolve(root, args, ctx) {
        const {
          prompt,
          word,
          skipCache,
          indexesReturned,
          resultIndexFromCache,
        } = args;
        const cacheResponses = await ctx.db.cacheResponse.findMany({
          where: {
            cacheWord: {
              text: word,
            },
            cachePrompt: {
              text: prompt,
            },
          },
          orderBy: {
            updatedAt: 'asc',
          },
        });
        const len = cacheResponses.length;
        if (len > 0) {
          if (typeof resultIndexFromCache === 'number') {
            if (resultIndexFromCache >= 0 && resultIndexFromCache < len) {
              return {
                result: cacheResponses[resultIndexFromCache].text,
                resultIndex: resultIndexFromCache,
                totalResultsInCache: len,
                cacheResponseId: cacheResponses[resultIndexFromCache].id,
              };
            } else {
              throw new GraphQLError(
                `"resultIndexFromCache": ${resultIndexFromCache} index is not valid min: 0, max: ${
                  len - 1
                }`,
                {
                  extensions: {
                    totalResultsInCache: len,
                  },
                }
              );
            }
          }
          const idx = randomBetween(0, len - 1, indexesReturned ?? undefined);
          if (idx !== null) {
            return {
              result: cacheResponses[idx].text,
              resultIndex: idx,
              totalResultsInCache: len,
              cacheResponseId: cacheResponses[idx].id,
            };
          } else {
            if (!skipCache) {
              throw new GraphQLError(`no more results in cache`, {
                extensions: {
                  totalResultsInCache: len,
                },
              });
            }
          }
        }

        const input = prompt.replaceAll('{word}', word);

        const message = await sendPrompt([{ role: 'user', content: input }]);
        const result = message?.content ?? '';
        // save the result in cache
        const createdCacheResponse = await ctx.db.cacheResponse.create({
          data: {
            cachePrompt: {
              connectOrCreate: {
                create: {
                  text: prompt,
                },
                where: {
                  text: prompt,
                },
              },
            },
            cacheWord: {
              connectOrCreate: {
                create: {
                  text: word,
                },
                where: {
                  text: word,
                },
              },
            },
            text: result,
          },
        });
        return {
          result: result,
          resultIndex: len,
          totalResultsInCache: len + 1,
          cacheResponseId: createdCacheResponse.id,
        };
      },
    });
    t.nonNull.list.field('wordsAndResponsesForPrompt', {
      type: nonNull('WordAndResponses'),
      args: {
        prompt: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { prompt } = args;

        const cacheResponses = await ctx.db.cacheResponse.findMany({
          where: {
            cachePrompt: {
              text: prompt,
            },
          },
          select: {
            text: true,
            cacheWord: {
              select: {
                text: true,
              },
            },
          },
        });
        const mp: Record<string, string[]> = {};
        for (let cacheResponse of cacheResponses) {
          if (mp[cacheResponse.cacheWord.text]) {
            mp[cacheResponse.cacheWord.text].push(cacheResponse.text);
          } else {
            mp[cacheResponse.cacheWord.text] = [cacheResponse.text];
          }
        }
        const result: { word: string; responses: string[] }[] = [];
        for (let word in mp) {
          result.push({ word: word, responses: mp[word] });
        }
        return result;
      },
    });
    t.nonNull.list.field('wordsCountForGptPrompts', {
      type: nonNull('WordsCountForGptPrompts'),
      args: {
        prompts: nonNull(list(nonNull(stringArg()))),
      },
      async resolve(root, args, ctx, info) {
        const { prompts } = args;
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
        const responses = await ctx.db.cacheResponse.findMany({
          where: { cachePrompt: { text: { in: prompts } } },
          select: { cachePrompt: { select: { text: true } } },
        });
        const mp: Record<string, number> = {};
        for (let response of responses) {
          mp[response.cachePrompt.text] =
            (mp[response.cachePrompt.text] ?? 0) + 1;
        }
        const result: { prompt: string; count: number }[] = [];
        for (let key in mp) {
          result.push({ prompt: key, count: mp[key] });
        }
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
        cacheResponseId: nonNull(stringArg()),
        greWordId: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { cacheResponseId, greWordId, ...restArgs } = args;
        const prismaArgs = parseGraphQLQuery<Prisma.GptPromptCreateArgs>(
          info,
          restArgs
        );

        const gptPrompt = await ctx.db.gptPrompt.create({
          ...prismaArgs,
          data: {
            greWordId: greWordId,
            cacheResponseId: cacheResponseId,
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

export const sendPrompt = async (messages: ChatCompletionMessageParam[]) => {
  const result = await openAI.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
  });
  return result.choices[0].message;
};
