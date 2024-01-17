import { handlers } from './cacheValue';
import invalidateManyCache from './invalidateManyCache';
import useCache from './useCache';

function memoize<T extends (...args: any[]) => any>(
  handler: keyof typeof handlers,
  functionName: string,
  func: T
): T & {
  invalidate: (...args: Parameters<T>) => Promise<void>;
  invalidateMany: (argsArray: Parameters<T>[]) => Promise<void>;
} {
  const memoizedFunc: any = async function (...args: Parameters<T>) {
    const key = {
      functionName,
      args,
    };
    const cache = useCache(handler, key);
    const value = await cache.get({
      getValue: (prev) => {
        return func(...args);
      },
    });
    return value as ReturnType<T>;
  } as T;
  const invalidate = async function (...args: Parameters<T>) {
    const key = {
      functionName,
      args,
    };
    const cache = useCache(handler, key);
    await cache.invalidate();
  };
  const invalidateMany = async function (argsArray: Parameters<T>[]) {
    const keys = argsArray.map((v) => ({
      functionName,
      args: v,
    }));
    await invalidateManyCache(handler, { keys });
  };
  memoizedFunc.invalidate = invalidate;
  memoizedFunc.invalidateMany = invalidateMany;
  return memoizedFunc;
}

export default memoize;
