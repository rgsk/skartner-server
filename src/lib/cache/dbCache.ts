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

const get = async (key: any) => {
  const cache = await db.cache.findUnique({ where: { key: key } });
  if (cache) {
    if (cacheNotExpired(cache)) {
      return cache.value as any;
    }
  }
  return null;
};

const set = async (
  key: any,
  value: any,
  expirationTimestamp: Date | null = null
) => {
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
};
const dbCache: CacheHandler = {
  get,
  set,
};
export default dbCache;
