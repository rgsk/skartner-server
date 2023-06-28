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
};
const handlers = {
  db: dbCache,
  redis: redisCache,
  inMemory: inMemoryCache,
};
const cacheValue =
  <T>(
    handler: keyof typeof handlers,
    key: any,
    getValue: () => T,
    expirationTimestamp: Date | null = null
  ) =>
  async (getFromCache?: (value: any) => T, setInCache?: (value: T) => any) => {
    const cachedValue = await handlers[handler].get(key);
    if (cachedValue) {
      return getFromCache ? getFromCache(cachedValue) : (cachedValue as T);
    }
    const value = await getValue();
    await handlers[handler].set(
      key,
      setInCache ? setInCache(value) : value,
      expirationTimestamp
    );
    return value;
  };
export default cacheValue;
