import Redis from 'ioredis';
import environmentVars from 'lib/environmentVars';
import { CacheHandler } from './cacheValue';
const redis = new Redis(environmentVars.REDIS_URL);
const getKey = (key: any) => {
  const stringifiedKey = JSON.stringify(key);
  return 'cache: ' + stringifiedKey;
};
const redisCache: CacheHandler = {
  get: async (key) => {
    const modifiedKey = getKey(key);
    const cachedValue = await redis.get(modifiedKey);
    return cachedValue ? JSON.parse(cachedValue) : null;
  },

  set: async (key, value, expirationTimestamp) => {
    const modifiedKey = getKey(key);
    await redis.set(modifiedKey, JSON.stringify(value));
    if (expirationTimestamp) {
      const now = Date.now();
      const expirationTime = expirationTimestamp.getTime() - now;
      await redis.pexpire(modifiedKey, expirationTime);
    }
  },

  delete: async (key) => {
    const modifiedKey = getKey(key);
    const deletionSuccessful = await redis.del(modifiedKey);
    // deletionSuccessful is 0 or 1
    // 1 -> when key exists
    // 0 -> when key doesn't exists
  },
};

export default redisCache;
