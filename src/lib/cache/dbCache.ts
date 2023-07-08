import { Cache } from '@prisma/client';
import { db } from 'db';
import { CacheHandler } from './cacheValue';

const cacheNotExpired = (cache: Cache) => {
  if (!cache.expirationTimestamp) {
    return true;
  }
  if (new Date() < cache.expirationTimestamp) {
    return true;
  }
  return false;
};

const dbCache: CacheHandler = {
  get: async (key: any) => {
    const cache = await db.cache.findUnique({ where: { key: key } });
    if (cache) {
      if (cacheNotExpired(cache)) {
        return cache.value as any;
      }
    }
    return null;
  },
  set: async (key, value, expirationTimestamp) => {
    const props = {
      value,
      expirationTimestamp,
    };
    const cache = await db.cache.upsert({
      create: {
        key,
        ...props,
      },
      update: {
        ...props,
      },
      where: {
        key,
      },
    });
  },
  delete: async (key) => {
    await db.cache.update({
      where: { key },
      data: { expirationTimestamp: new Date() },
    });
  },
};
export default dbCache;
