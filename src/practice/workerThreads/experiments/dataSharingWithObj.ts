// Main thread
import path from 'path';
import { Worker } from 'worker_threads';
const sharedObject = { value: 42 }; // Object to be shared

const worker = new Worker(path.join(__dirname, 'modify.js'), {
  workerData: JSON.stringify(sharedObject), // Serialize the object
});

worker.on('message', (message) => {
  const sharedObjectCopy = JSON.parse(message); // Deserialize the object
  console.log(sharedObjectCopy.value); // Access the shared object copy
});
