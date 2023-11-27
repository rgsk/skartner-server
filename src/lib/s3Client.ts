import { S3Client } from '@aws-sdk/client-s3';
import environmentVars from './environmentVars';

export const s3ClientRegion = 'ap-south-1';
export const s3ClientBuckets = {
  skartner: 'skartner',
};
const s3Client = new S3Client({
  region: s3ClientRegion,
  credentials: {
    accessKeyId: environmentVars.AWS.ACCESS_KEY,
    secretAccessKey: environmentVars.AWS.SECRET_ACCESS_KEY,
  },
});
export default s3Client;
