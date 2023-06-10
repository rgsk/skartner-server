// worker.js
const { workerData, parentPort } = require('worker_threads');

const sharedObject = JSON.parse(workerData); // Deserialize the shared object
sharedObject.value++; // Modify the shared object

parentPort.postMessage(JSON.stringify(sharedObject)); // Serialize and send the modified object back to the main thread
