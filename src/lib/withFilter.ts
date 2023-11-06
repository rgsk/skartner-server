import { getContext } from 'context';
import { DropFirst } from './typescrptMagic';

export function withFilter<T extends (...args: any) => any>(
  asyncIteratorFn: T,
  filterFn: (root: any, ...args: DropFirst<Parameters<T>>) => Promise<boolean>
) {
  const fn: any = async (
    rootValue: any,
    args: any,
    context: any,
    info: any
  ) => {
    const ctx = await getContext(args.token);
    const asyncIterator = await asyncIteratorFn(rootValue, args, ctx, info);

    const getNextPromise = () => {
      return new Promise((resolve, reject) => {
        const inner = () => {
          asyncIterator
            .next()
            .then((payload: any) => {
              if (payload.done === true) {
                resolve(payload);
                return;
              }
              Promise.resolve((filterFn as any)(payload.value, args, ctx, info))
                .catch(() => false) // We ignore errors from filter function
                .then((filterResult) => {
                  if (filterResult === true) {
                    resolve(payload);
                    return;
                  }
                  // Skip the current value and wait for the next one
                  inner();
                  return;
                });
            })
            .catch((err: any) => {
              reject(err);
              return;
            });
        };

        inner();
      });
    };

    const asyncIterator2 = {
      next() {
        return getNextPromise();
      },
      return() {
        return asyncIterator.return();
      },
      throw(error: any) {
        return asyncIterator.throw(error);
      },
      [Symbol.asyncIterator]() {
        return this;
      },
    };

    return asyncIterator2;
  };

  return fn as T;
}
