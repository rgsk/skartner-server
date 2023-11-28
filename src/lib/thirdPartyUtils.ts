import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import axios from 'axios';
import { secondsInDay } from 'date-fns';
import openAI from 'lib/openAI';
import s3Client, { s3ClientBuckets, s3ClientRegion } from 'lib/s3Client';
import { ChatCompletionMessageParam } from 'openai/resources';
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

  const bucket = s3ClientBuckets.skartner;
  const region = s3ClientRegion;

  const multipartUpload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucket,
      Key: key,
      Body: stream,
      ContentType: 'audio/mp3',
    },
  });
  await multipartUpload.done();
  const objectUrl = composeS3Url({ bucket, region, key });
  return objectUrl;
}

export async function uploadImageToS3({
  buffer,
  key,
}: {
  buffer: Buffer;
  key: string;
}) {
  const bucket = s3ClientBuckets.skartner;
  const region = s3ClientRegion;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
  });

  const response = await s3Client.send(command);
  const objectUrl = composeS3Url({ bucket, region, key });
  return objectUrl;
}

export const composeS3Url = ({
  bucket,
  region,
  key,
}: {
  bucket: string;
  region: string;
  key: string;
}) => {
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

export const decomposeS3Url = (url: string) => {
  // Define the regex pattern
  const pattern: RegExp =
    /^https:\/\/(?<bucket>[\w.-]+)\.s3\.(?<region>[\w-]+)\.amazonaws\.com\/(?<key>.+)$/;

  // Match the pattern against the URL
  const match: RegExpMatchArray | null = url.match(pattern);

  // Extract the values
  if (match) {
    const bucket: string = match.groups?.bucket || '';
    const region: string = match.groups?.region || '';
    const key: string = match.groups?.key || '';

    return {
      bucket,
      region,
      key,
    };
  } else {
    throw new Error('No match found.');
  }
};

export const createPresignedUrlWithClient = ({
  bucket,
  key,
}: {
  bucket: string;
  key: string;
}) => {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(s3Client, command, { expiresIn: secondsInDay });
};

export const getPresignedUrl = async (url: string) => {
  const { bucket, key, region } = decomposeS3Url(url);
  const presignedUrl = await createPresignedUrlWithClient({
    bucket,
    key,
  });
  return presignedUrl;
};

export const sendPrompt = async (messages: ChatCompletionMessageParam[]) => {
  const result = await openAI.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
  });
  return result.choices[0].message;
};

const getDallePrompt = async (word: string) => {
  const result = await openAI.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `I am using dalle-2 for generating images, please write a prompt to generate an image for remembering the meaning of word - ${word}, please be concise`,
      },
    ],
  });
  return result.choices[0].message.content;
};

export async function getImagesForWord({
  word,
  numberOfImages,
}: {
  word: string;
  numberOfImages: number;
}) {
  const dallePrompt = await getDallePrompt(word);
  if (dallePrompt) {
    const response = await openAI.images.generate({
      model: 'dall-e-2',
      prompt: dallePrompt,
      n: numberOfImages,
      size: '256x256',
      response_format: 'b64_json',
    });
    const imageUrls = await Promise.all(
      response.data.map((res, i) => {
        const buffer = Buffer.from(res.b64_json!, 'base64');
        return uploadImageToS3({ buffer, key: `${word}-${i + 1}.png` });
      })
    );
    return imageUrls;
  }
}

export async function saveImageToS3({
  imageUrl,
  key,
}: {
  imageUrl: string;
  key: string;
}) {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data, 'utf-8');

  return uploadImageToS3({ buffer, key });
}
