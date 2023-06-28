import { CacheHandler } from './cacheValue';

const cacheMap = new Map();
const getKey = (key: any) => {
  return JSON.stringify(key);
};
const inMemoryCache: CacheHandler = {
  get: async (key: any) => {
    console.log(cacheMap);
    const modifiedKey = getKey(key);
    const cachedValue = cacheMap.get(modifiedKey);
    return cachedValue !== undefined ? cachedValue : null;
  },

  set: async (
    key: any,
    value: any,
    expirationTimestamp: Date | null = null
  ) => {
    const modifiedKey = getKey(key);
    cacheMap.set(modifiedKey, value);
    if (expirationTimestamp) {
      const now = Date.now();
      const expirationTime = expirationTimestamp.getTime() - now;
      setTimeout(() => {
        cacheMap.delete(modifiedKey);
      }, expirationTime);
    }
  },
};

export default inMemoryCache;
