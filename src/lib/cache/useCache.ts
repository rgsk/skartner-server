import cacheValue, {
  CacheOptions,
  CacheValueProps,
  handlers,
} from './cacheValue';
import invalidateCache from './invalidateCache';

const useCache = (handler: keyof typeof handlers, key: any) => {
  return {
    get: async <T>(
      valueProps: Omit<CacheValueProps<T>, 'key'>,
      options?: CacheOptions
    ) => {
      return cacheValue(
        handler,
        {
          key,
          ...valueProps,
        },
        options
      );
    },
    invalidate: async () => {
      return invalidateCache(handler, { key });
    },
  };
};

export default useCache;
