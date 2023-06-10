import { Worker } from 'worker_threads';

export const runOnWorkerThread = (scriptPath: string, workerData: any) => {
  return new Promise((resolve, reject) => {
    // const start = Date.now();

    // Start worker
    const worker = new Worker(scriptPath, {
      workerData: workerData,
    });
    // Listen for message from worker
    worker.once('message', (data) => {
      //   console.log(
      //     `worker [${worker.threadId}]: done in ${Date.now() - start}ms`
      //   );
      resolve(data);
    });
    // Listen for error from worker
    worker.once('error', (err) => reject(err));
  });
};
