import { handlers } from './cacheValue';
import useCache from './useCache';

function memoize<T extends (...args: any[]) => any>(
  handler: keyof typeof handlers,
  functionName: string,
  func: T
): T & { invalidate: T } {
  let memoizedFunc = async function (...args: Parameters<T>) {
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
  // @ts-ignore
  memoizedFunc.invalidate = async function (...args: Parameters<T>) {
    const key = {
      functionName,
      args,
    };
    const cache = useCache(handler, key);
    await cache.invalidate();
  };
  // @ts-ignore
  return memoizedFunc;
}

export default memoize;
