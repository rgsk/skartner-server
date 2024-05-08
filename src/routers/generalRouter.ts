import { Router } from 'express';
import fs from 'fs';
import openAI from 'lib/openAI';
import { getPresignedUrl, uploadAudio } from 'lib/thirdPartyUtils';
import multer from 'multer';
import path from 'path';
import { v4 } from 'uuid';
import { z } from 'zod';
const generalRouter = Router();
const textToSpeechSchema = z.object({
  input: z.string(),
  voice: z.enum(['nova', 'alloy', 'echo', 'fable', 'onyx', 'shimmer']),
});

generalRouter.post('/text-to-speech', async (req, res, next) => {
  try {
    const { input, voice } = textToSpeechSchema.parse(req.body);
    const mp3 = await openAI.audio.speech.create({
      model: 'tts-1',
      voice: voice,
      input: input,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    const url = await uploadAudio({ buffer, key: v4() });
    const presignedUrl = await getPresignedUrl(url);
    return res.json({ url: presignedUrl });
  } catch (err) {
    next(err);
  }
});

generalRouter.post('/text-to-speech-buffer', async (req, res, next) => {
  try {
    const { input, voice } = textToSpeechSchema.parse(req.body);
    const mp3 = await openAI.audio.speech.create({
      model: 'tts-1',
      voice: voice,
      input: input,
    });
    const arrayBuffer = await mp3.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return res.send(buffer);
  } catch (err) {
    next(err);
  }
});

const dest = path.join(__dirname, 'uploads');
const storage = multer.diskStorage({
  destination: dest,
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split('/');
    let extension = extArray[extArray.length - 1];
    cb(
      null,
      file.fieldname +
        '-' +
        file.originalname +
        '-' +
        Date.now() +
        '.' +
        extension
    );
  },
});
const upload = multer({
  storage: storage,
});

const speechToTextSchema = z.object({
  prompt: z.string(),
  type: z.enum(['transcription', 'translation']),
});

generalRouter.post(
  '/speech-to-text',
  upload.single('audio'),
  async (req, res, next) => {
    const { prompt, type } = speechToTextSchema.parse(req.query);
    try {
      if (req.file) {
        const data = fs.createReadStream(req.file.path);
        let text = '';
        if (type == 'transcription') {
          const transcription = await openAI.audio.transcriptions.create({
            model: 'whisper-1',
            file: data,
            prompt,
          });
          text = transcription.text;
        } else {
          const translation = await openAI.audio.translations.create({
            model: 'whisper-1',
            file: data,
            prompt,
          });
          text = translation.text;
        }

        await new Promise((resolve, reject) => {
          fs.unlink(req.file!.path, (err) => {
            if (err) return reject(err);
            resolve(null);
          });
        });
        return res.json({
          text,
        });
      }
      throw new Error('no file provided');
    } catch (err) {
      next(err);
    }
  }
);

generalRouter.get('/presigned-url', async (req, res, next) => {
  try {
    const { url } = z
      .object({
        url: z.string(),
      })
      .parse(req.query);
    const presignedUrl = await getPresignedUrl(url);
    return res.json({ presignedUrl });
  } catch (err) {
    next(err);
  }
});

export default generalRouter;
