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
  delete: (key: any) => Promise<void>;
};
export const handlers = {
  db: dbCache,
  redis: redisCache,
  inMemory: inMemoryCache,
};

export type CacheValueProps<T> = {
  key: any;
  getValue: (previousCachedValue: any) => Promise<T>;
  expirationTimestamp?: Date | null;
  getFromCache?: (cachedValue: any) => T;
  setInCache?: (value: T, previousCachedValue: any) => any;
};
export type CacheOptions = {
  disabled?: boolean;
  updateCacheWhileDisabled?: boolean;
};
const cacheValue = async <T>(
  handler: keyof typeof handlers,
  {
    key,
    getValue,
    expirationTimestamp = null,
    getFromCache,
    setInCache,
  }: CacheValueProps<T>,
  options?: CacheOptions
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
  const cachedValue = await handlers[handler].get(key);
  if (!disabled) {
    if (cachedValue) {
      return getFromCache ? getFromCache(cachedValue) : (cachedValue as T);
    }
  }
  const value = await getValue(cachedValue);
  if (!disabled || updateCacheWhileDisabled) {
    await handlers[handler].set(
      key,
      setInCache ? setInCache(value, cachedValue) : value,
      expirationTimestamp
    );
  }
  return value;
};

export default cacheValue;
