import dbCache from './dbCache';
import inMemoryCache from './inMemoryCache';
import redisCache from './redisCache';

export type CacheHandler = {
  get: (key: any) => Promise<any>;
  set: (
    key: any,
    value: any,
    expirationTimestamp?: Date | null
  ) => Promise<void>;
  delete: (key: any) => Promise<void>;
};
export const handlers = {
  db: dbCache,
  redis: redisCache,
  inMemory: inMemoryCache,
};

export type CacheValueProps<T> = {
  key: any;
  getValue: (previousCachedValue: any) => Promise<T>;
  expirationTimestamp?: Date | null;
  getFromCache?: (cachedValue: any) => T;
  setInCache?: (value: T, previousCachedValue: any) => any;
};
export type CacheOptions = {
  disabled?: boolean;
  updateCacheWhileDisabled?: boolean;
};
const cacheValue = async <T>(
  handler: keyof typeof handlers,
  {
    key,
    getValue,
    expirationTimestamp = null,
    getFromCache,
    setInCache,
  }: CacheValueProps<T>,
  options?: CacheOptions
) => {
  if (getFromCache || setInCache) {
    // if either of them are provided in args
    // both should be provided
    if (!getFromCache || !setInCache) {
      throw new Error(
        'Both "getFromCache" and "setInCache" should be provided if either of them is provided'
      );
    }
  }
  const { disabled = false, updateCacheWhileDisabled = false } = options ?? {};
  const cachedValue = await handlers[handler].get(key);
  if (!disabled) {
    if (cachedValue) {
      return getFromCache ? getFromCache(cachedValue) : (cachedValue as T);
    }
  }
  const value = await getValue(cachedValue);
  if (!disabled || updateCacheWhileDisabled) {
    await handlers[handler].set(
      key,
      setInCache ? setInCache(value, cachedValue) : value,
      expirationTimestamp
    );
  }
  return value;
};

export default cacheValue;

// example usage

/*
const result = await cacheValue<NexusGenObjects['SendSinglePromptResponse']>(
  'db',
  {
    key: {
      query: 'sendSinglePrompt',
      args: {
        input,
      },
    },
    getValue: async (previousCachedValue) => {
      const message = await sendPrompt([{ role: 'user', content: input }]);
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
      const idx = randomBetween(0, len - 1, indexesReturned ?? undefined);
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
*/
