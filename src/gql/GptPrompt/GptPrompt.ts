import { CacheResponse, GreWord, Prisma } from '@prisma/client';
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
  getImagesForWord,
  getPresignedUrl,
  getWordSpeechUrl,
  saveImageToS3,
  sendPrompt,
  uploadImageToS3,
} from 'lib/thirdPartyUtils';
import {
  arg,
  extendType,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { v4 as uuidv4 } from 'uuid';

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
    t.nonNull.list.nonNull.string('imageUrls');

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
    t.field('pronunciationAudioUrl', {
      type: 'String',
      resolve: async (root: any, args, ctx) => {
        // return signed url
        const url = root.pronunciationAudioUrl;
        if (url) {
          const presignedUrl = await getPresignedUrl(url);
          return presignedUrl;
        }
        return null;
      },
    });
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
    t.int('resultIndex');
    t.int('totalResultsInCache');
    t.string('cacheResponseId');
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

export const savePromptAsCacheResponse = async ({
  word,
  prompt,
  result,
}: {
  word: string;
  prompt: string;
  result: string;
}) => {
  // save the result in cache
  const cacheWord = await db.cacheWord.findUnique({
    where: { text: word },
  });
  const pronunciationAudioUrl =
    cacheWord?.pronunciationAudioUrl ?? (await getWordSpeechUrl(word));
  const createdCacheResponse = await db.cacheResponse.create({
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
            pronunciationAudioUrl: pronunciationAudioUrl,
          },
          where: {
            text: word,
          },
        },
      },
      text: result,
    },
    include: { cacheWord: true },
  });
  return createdCacheResponse;
};

export const getOrCreateCacheResponse = async ({
  cacheResponseId,
  createCacheResponseData,
}: {
  cacheResponseId: string | null | undefined;
  createCacheResponseData:
    | {
        prompt: string;
        result: string;
        word: string;
      }
    | null
    | undefined;
}) => {
  if (!cacheResponseId && !createCacheResponseData) {
    throw new Error(
      `either cacheResponseId or createCacheResponseData must be present`
    );
  }

  const cacheResponse = cacheResponseId
    ? await db.cacheResponse.findUnique({
        where: { id: cacheResponseId },
        include: { cacheWord: true },
      })
    : await savePromptAsCacheResponse(createCacheResponseData!);

  if (!cacheResponse) {
    throw new Error("cacheResponse doesn't exists");
  }
  return cacheResponse;
};

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

    // TODO: not integrated
    t.field('generateImagesForWord', {
      type: objectType({
        name: 'GenerateImagesForWordResponse',
        definition(t) {
          t.list.nonNull.string('imageUrls');
        },
      }),
      args: {
        word: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { word } = args;
        const imageUrls = await getImagesForWord({ word, numberOfImages: 1 });
        const presignedImageUrls =
          imageUrls &&
          (await Promise.all(imageUrls.map((url) => getPresignedUrl(url))));
        return {
          imageUrls: presignedImageUrls,
        };
      },
    });
    t.field('generateImagesForPrompt', {
      type: objectType({
        name: 'GenerateImagesForPromptResponse',
        definition(t) {
          t.list.string('imageUrls');
        },
      }),
      args: {
        prompt: nonNull(stringArg()),
      },
      async resolve(root, args, ctx, info) {
        const { prompt } = args;
        const imagesResponse = await openAI.images.generate({
          model: 'dall-e-2',
          prompt: prompt,
          n: 1,
          size: '256x256',
          response_format: 'b64_json',
        });
        const imageUrls = await Promise.all(
          imagesResponse.data.map((res, i) => {
            const buffer = Buffer.from(res.b64_json!, 'base64');
            return uploadImageToS3({ buffer, key: uuidv4() });
          })
        );
        const presignedImageUrls =
          imageUrls &&
          (await Promise.all(imageUrls.map((url) => getPresignedUrl(url))));
        return {
          imageUrls: presignedImageUrls,
        };
      },
    });

    t.nonNull.field('sendSinglePrompt', {
      type: 'SendSinglePromptResponse',
      args: {
        prompt: nonNull(stringArg()),
        word: nonNull(stringArg()),
        fetchPolicy: nonNull(
          arg({ type: 'FetchPolicy', default: 'cacheFirst' })
        ),
        indexesReturned: list(nonNull(intArg())),
        resultIndexFromCache: intArg(),
      },
      async resolve(root, args, ctx) {
        const {
          prompt,
          word,
          indexesReturned,
          resultIndexFromCache,
          fetchPolicy,
        } = args;

        let len: number | undefined;
        if (fetchPolicy === 'cacheFirst' || fetchPolicy === 'cacheOnly') {
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
          len = cacheResponses.length;
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
              if (fetchPolicy === 'cacheOnly') {
                throw new GraphQLError(`no more results in cache`, {
                  extensions: {
                    totalResultsInCache: len,
                  },
                });
              }
            }
          }
        }

        const input = prompt.replaceAll('{word}', word);

        const result = await sendPrompt(input, 'openAI');
        let createdCacheResponse: CacheResponse | undefined;
        if (fetchPolicy !== 'noCache') {
          createdCacheResponse = await savePromptAsCacheResponse({
            word,
            prompt,
            result,
          });
        }
        return {
          result: result,
          resultIndex: len,
          totalResultsInCache: len ? len + 1 : undefined,
          cacheResponseId: createdCacheResponse?.id,
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

    // this saveImageToS3 mutation is not used for now
    // it can be used to upload openAI image url to s3
    /*
    args
    {
      "imageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-LedaM9ZptbYAOWSNfz05Z5Ug/user-WveI6TsKFKIg30CC8anhvbpW/img-61lVy1ATx9CL7dvkjahVSHyH.png?st=2023-11-28T04%3A20%3A00Z&se=2023-11-28T06%3A20%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-28T00%3A32%3A32Z&ske=2023-11-29T00%3A32%3A32Z&sks=b&skv=2021-08-06&sig=dHF3oYWdJfzocWKF1A892isKLMvhwLWKvG8nhDWkqao%3D"
    }
    */
    /*
   response
   {
      "data": {
        "saveImageToS3": {
          "s3Url": "https://skartner.s3.ap-south-1.amazonaws.com/108466b3-16e6-4ae0-bc32-7d7d82c09107?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVMF64MVPJMUUHD6G%2F20231128%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20231128T061024Z&X-Amz-Expires=86400&X-Amz-Signature=fd3bac9866ef16b4bb9deeef1760a05d31688c594b304a46dd2c807ca523bb9e&X-Amz-SignedHeaders=host&x-id=GetObject"
        }
      }
    }
   */
    // TODO: not integrated
    t.field('saveImageToS3', {
      type: objectType({
        name: 'SaveImageToS3Response',
        definition(t) {
          t.string('s3Url');
        },
      }),
      args: {
        imageUrl: nonNull(stringArg()),
        key: stringArg(),
      },
      async resolve(root, args, ctx, info) {
        const { imageUrl, key } = args;
        const s3Url = await saveImageToS3({ imageUrl, key: key || uuidv4() });
        const presignedS3Url = await getPresignedUrl(s3Url);
        return {
          s3Url: presignedS3Url,
        };
      },
    }),
      t.field('createGptPrompt', {
        type: nonNull('GptPrompt'),
        args: {
          cacheResponseId: stringArg(),
          createCacheResponseData: arg({
            type: 'CreateCacheResponseData',
          }),
          greWordId: nonNull(stringArg()),
        },
        async resolve(root, args, ctx, info) {
          const {
            cacheResponseId,
            createCacheResponseData,
            greWordId,
            ...restArgs
          } = args;

          const prismaArgs = parseGraphQLQuery<Prisma.GptPromptCreateArgs>(
            info,
            restArgs
          );
          const cacheResponse = await getOrCreateCacheResponse({
            cacheResponseId,
            createCacheResponseData,
          });
          const gptPrompt = await ctx.db.gptPrompt.create({
            ...prismaArgs,
            data: {
              greWordId: greWordId,
              cacheResponseId: cacheResponse.id,
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
        imageUrls: list(nonNull(stringArg())),
      },
      async resolve(root, args, ctx, info) {
        const { id, editedResponse, imageUrls, ...restArgs } = args;
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
            editedResponse: editedResponse,
            imageUrls: imageUrls ?? undefined,
          },
        });
        return gptPrompt;
      },
    });
  },
});
