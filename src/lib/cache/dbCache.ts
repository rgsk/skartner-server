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
  get: async function (key: any) {
    const cache = await db.cache.findUnique({ where: { key: key } });
    if (cache) {
      if (cacheNotExpired(cache)) {
        return cache.value as any;
      } else {
        this.delete(key);
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
    await db.cache.delete({
      where: { key },
    });
  },
  deleteMany: async (keys) => {
    await db.cache.deleteMany({
      where: {
        OR: keys.map((keyValue) => ({ key: { equals: keyValue } })),
      },
    });
  },
};
export default dbCache;
