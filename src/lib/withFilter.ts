// @ts-nocheck

import { getContext } from 'context';

export function withFilter(
  asyncIteratorFn: (rootValue: any, args: any, context: any, info: any) => any,
  filterFn: (
    rootValue: any,
    args: any,
    context: any,
    info: any
  ) => Promise<boolean>
) {
  return async (rootValue, args, context, info) => {
    const ctx = await getContext(args.token);
    const asyncIterator = await asyncIteratorFn(rootValue, args, ctx, info);

    const getNextPromise = () => {
      return new Promise((resolve, reject) => {
        const inner = () => {
          asyncIterator
            .next()
            .then((payload) => {
              if (payload.done === true) {
                resolve(payload);
                return;
              }
              Promise.resolve(filterFn(payload.value, args, ctx, info))
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
            .catch((err) => {
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
      throw(error) {
        return asyncIterator.throw(error);
      },
      [Symbol.asyncIterator]() {
        return this;
      },
    };

    return asyncIterator2;
  };
}
