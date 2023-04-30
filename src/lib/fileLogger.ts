import fs from 'fs';
import path from 'path';

import appWideDecider from './appWideDecider';

// fileLogger can be used if you want to
// debug something and console is getting bloated
// or when objects and arrays are not expanding in console
// problem like below
/*
{
  messagesValidationErrors: [
    [Error [ValidationError]: "time" failed custom validation because Invalid format, it must match syntax like 01:17:10 for 1 hour, 17 minutes, 10 seconds] {
      _original: [Object],
      details: [Array]
    },
    [Error [ValidationError]: "time" is not allowed to be empty] {
      _original: [Object],
      details: [Array]
    }
  ]
}
*/

// USAGE:
// fileLogger.clearTextFile(); // this empties the file
// fileLogger.logToTextFile('some message');

// CAUTION:
// don't leave
// fileLogger.logToTextFile('some message');
// commented in the code, remove it as soon as you use it

const filePaths = {
  textFile: path.join(__dirname, '../../logs/file-logs.txt'),
  jsFile: path.join(__dirname, '../../logs/file-js-logs.js'),
};

const clearTextFile = () => {
  if (appWideDecider.enableFileLogger) {
    fs.writeFile(filePaths.textFile, '', 'utf-8', (err) => {
      if (err) throw err;
    });
  }
};
const logToTextFile = (data: any) => {
  if (appWideDecider.enableFileLogger) {
    fs.appendFile(
      filePaths.textFile,
      JSON.stringify(data) + '\n\n',
      'utf8',
      // callback function
      function (err) {
        if (err) throw err;
        // if no error
        // console.log('Data is appended to file successfully.');
      }
    );
  }
};

const clearJsFile = () => {
  if (appWideDecider.enableFileLogger) {
    fs.writeFile(filePaths.jsFile, '', 'utf-8', (err) => {
      if (err) throw err;
    });
  }
};

let i = 0;

// use below if you want to capture logged information in a javascript variable
// we can quickly format the javascript file and see the entire object clearly
const logToJsFile = (data: any) => {
  if (appWideDecider.enableFileLogger) {
    fs.appendFile(
      filePaths.jsFile,
      `const log_at_${Date.now()}_${i++} = ${JSON.stringify(data)}` + '\n\n',
      'utf8',
      // callback function
      function (err) {
        if (err) throw err;
        // if no error
        // console.log('Data is appended to file successfully.');
      }
    );
  }
};
const fileLogger = {
  clearTextFile,
  logToTextFile,
  clearJsFile,
  logToJsFile,
};
export default fileLogger;
