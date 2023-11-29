import { SESClient } from '@aws-sdk/client-ses';
import environmentVars from './environmentVars';

export const sesClientRegion = 'ap-south-1';

const sesClient = new SESClient({
  region: sesClientRegion,
  credentials: {
    accessKeyId: environmentVars.AWS.ACCESS_KEY,
    secretAccessKey: environmentVars.AWS.SECRET_ACCESS_KEY,
  },
});
export default sesClient;
