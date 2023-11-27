import fs from 'fs';
import openAI from 'lib/openAI';
import path from 'path';
const speechFile = path.resolve('./speech.mp3');

export async function example() {
  const mp3 = await openAI.audio.speech.create({
    model: 'tts-1',
    voice: 'nova',
    input: `
      how are you?
    `,
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}
