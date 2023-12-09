import { runOnWorkerThread } from 'lib/workerThreadUtils';
import path from 'path';

const withThread = (n: number) =>
  runOnWorkerThread(path.join(__dirname, 'fib.js'), { n: n });

function fibonacci(n: number): number {
  return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}
const withoutThread = (n: number) =>
  new Promise((resolve) => resolve(fibonacci(n)));

export const runExampleWorkerThread = async () => {
  const start = Date.now();
  const values = await Promise.all(
    Array(10)
      .fill(0)
      .map((v) => withThread(40))
  );
  console.log('values', values);
  console.log(`fib done in ${Date.now() - start}ms`);
};
