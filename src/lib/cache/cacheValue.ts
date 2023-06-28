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
const cacheValue = async <T>(
  handler: keyof typeof handlers,
  {
    key,
    getValue,
    expirationTimestamp = null,
    getFromCache,
    setInCache,
  }: {
    key: any;
    getValue: () => T;
    expirationTimestamp?: Date | null;
    getFromCache?: (value: any) => T;
    setInCache?: (value: T) => any;
  },
  options?: {
    disabled?: boolean;
    updateCacheWhileDisabled?: boolean;
  }
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
  if (!disabled) {
    const cachedValue = await handlers[handler].get(key);
    if (cachedValue) {
      return getFromCache ? getFromCache(cachedValue) : (cachedValue as T);
    }
  }
  const value = await getValue();
  if (!disabled || updateCacheWhileDisabled) {
    await handlers[handler].set(
      key,
      setInCache ? setInCache(value) : value,
      expirationTimestamp
    );
  }
  return value;
};
export default cacheValue;
