// https://www.youtube.com/watch?v=_Im4_3Z1NxQ

import path from 'path';
import { Worker } from 'worker_threads';
const fibPath = path.join(__dirname, 'fib.js');
console.log(fibPath);

const doFib = (iterations: number) =>
  new Promise((resolve, reject) => {
    const start = Date.now();
    // Start worker
    const worker = new Worker(fibPath, {
      workerData: {
        iterations: iterations,
      },
    });
    // Listen for message from worker
    worker.once('message', (data) => {
      console.log(
        `worker [${worker.threadId}]: done in ${Date.now() - start}ms`
      );
      resolve(data);
    });
    // Listen for error from worker
    worker.once('error', (err) => reject(err));
  });

const main = async () => {
  const start = Date.now();
  const values = await Promise.all(
    Array(10)
      .fill(0)
      .map((v) => doFib(40))
  );
  console.log('values', values);
  console.log(`fib done in ${Date.now() - start}ms`);
};

main().catch(console.error);

export default {};
