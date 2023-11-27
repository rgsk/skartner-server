import { S3Client } from '@aws-sdk/client-s3';
import environmentVars from './environmentVars';

const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: environmentVars.AWS.ACCESS_KEY,
    secretAccessKey: environmentVars.AWS.SECRET_ACCESS_KEY,
  },
});
export default s3Client;
