// @ts-nocheck

import fileLogger from 'lib/fileLogger';

export const BASIC_LOGGING = {
  requestDidStart(requestContext) {
    console.log('request started');
    console.log(requestContext.request.query);
    console.log(requestContext.request.variables);
    fileLogger.logToTextFile(requestContext.request.query);
    return {
      didEncounterErrors(requestContext) {
        console.log(
          'an error happened in response to query ' +
            requestContext.request.query
        );
        console.log(requestContext.errors);
      },
    };
  },

  willSendResponse(requestContext) {
    console.log('response sent', requestContext.response);
  },
};
//
