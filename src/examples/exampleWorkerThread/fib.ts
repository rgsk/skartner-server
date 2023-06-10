import { parentPort, workerData } from 'worker_threads';

function fibonacci(n: number): number {
  return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(workerData.n);

parentPort?.postMessage(result);
