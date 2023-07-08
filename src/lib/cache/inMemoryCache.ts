import { CacheHandler } from './cacheValue';

const cacheMap = new Map();
const getKey = (key: any) => {
  return JSON.stringify(key);
};
const inMemoryCache: CacheHandler = {
  get: async (key) => {
    const modifiedKey = getKey(key);
    const cachedValue = cacheMap.get(modifiedKey);
    return cachedValue !== undefined ? cachedValue : null;
  },

  set: async (key, value, expirationTimestamp) => {
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
  delete: async (key) => {
    const modifiedKey = getKey(key);
    cacheMap.delete(modifiedKey);
  },
};

export default inMemoryCache;
