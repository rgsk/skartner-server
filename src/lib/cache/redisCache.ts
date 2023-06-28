import Redis from 'ioredis';
import environmentVars from 'lib/environmentVars';
import { CacheHandler } from './cacheValue';
const redis = new Redis(environmentVars.REDIS_URL);
const getKey = (key: any) => {
  const stringifiedKey = JSON.stringify(key);
  return 'cache: ' + stringifiedKey;
};
const redisCache: CacheHandler = {
  get: async (key: any) => {
    const modifiedKey = getKey(key);
    const cachedValue = await redis.get(modifiedKey);
    return cachedValue ? JSON.parse(cachedValue) : null;
  },

  set: async (
    key: any,
    value: any,
    expirationTimestamp: Date | null = null
  ) => {
    const modifiedKey = getKey(key);
    await redis.set(modifiedKey, JSON.stringify(value));
    if (expirationTimestamp) {
      const now = Date.now();
      const expirationTime = expirationTimestamp.getTime() - now;
      await redis.pexpire(modifiedKey, expirationTime);
    }
  },
};

export default redisCache;
