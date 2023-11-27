import fs from 'fs';
import openAI from 'lib/openAI';
import path from 'path';

async function createSpeech() {
  const speechFile = path.resolve('./speech.mp3');
  const mp3 = await openAI.audio.speech.create({
    model: 'tts-1',
    voice: 'nova',
    input: `
        what are you wearing bro?
      `,
  });
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}

createSpeech();
