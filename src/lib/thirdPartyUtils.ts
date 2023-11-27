import { Upload } from '@aws-sdk/lib-storage';
import openAI from 'lib/openAI';
import s3Client from 'lib/s3Client';
import { Readable } from 'stream';

export async function getWordSpeechUrl(word: string) {
  return getSpeechUrl({ input: word, key: `${word}.mp3` });
}

export async function getSpeechUrl({
  input,
  key,
}: {
  input: string;
  key: string;
}) {
  const buffer = await getSpeech(input);
  const url = await uploadAudio({ buffer, key });
  return url;
}

export async function getSpeech(input: string) {
  const mp3 = await openAI.audio.speech.create({
    model: 'tts-1',
    voice: 'nova',
    input: input,
  });
  const buffer = Buffer.from(await mp3.arrayBuffer());
  return buffer;
}

export async function uploadAudio({
  buffer,
  key,
}: {
  buffer: Buffer;
  key: string;
}) {
  const stream = Readable.from(buffer);

  const bucketName = 'skartner';

  const multipartUpload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucketName,
      Key: key,
      Body: stream,
      ContentType: 'audio/mp3',
    },
  });

  await multipartUpload.done();

  const objectUrl = `https://${bucketName}.s3.ap-south-1.amazonaws.com/${key}`;
  return objectUrl;
}
