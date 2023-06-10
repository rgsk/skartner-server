import path from 'path';
import { Worker } from 'worker_threads';

const wPath = path.join(__dirname, 'w.js');
console.log(wPath);

const sharedBuffer = new SharedArrayBuffer(4);
const buffer = new Uint8Array(sharedBuffer);
buffer.fill(5);
console.log(`buffer before modify: ${buffer}`);

// create a worker and pass the shared buffer to it
const worker = new Worker(wPath, {
  workerData: { sharedBuffer },
});
worker.once('message', () => {
  console.log(`buffer after modify: ${buffer}`);
});
