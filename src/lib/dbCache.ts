import { Cache, Prisma } from '@prisma/client';
import { db } from 'db';

const cacheNotExpired = (cache: Cache) => {
  if (!cache.expirationTimestamp) {
    return true;
  }
  if (new Date() < cache.expirationTimestamp) {
    return true;
  }
  return false;
};

const get = async (key: Prisma.InputJsonValue) => {
  const cache = await db.cache.findUnique({ where: { key: key } });
  if (cache) {
    if (cacheNotExpired(cache)) {
      return cache.value;
    }
  }
};

const set = async (
  key: Prisma.InputJsonValue,
  value: Prisma.InputJsonValue | typeof Prisma.JsonNull,
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
  return cache;
};
const dbCache = {
  get,
  set,
};
export default dbCache;
