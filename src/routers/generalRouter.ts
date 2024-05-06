import { Router } from 'express';
import openAI from 'lib/openAI';
import { getPresignedUrl, uploadAudio } from 'lib/thirdPartyUtils';
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
