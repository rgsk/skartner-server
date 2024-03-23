import fs from 'fs';
import environmentVars from 'lib/environmentVars';
import path from 'path';
export const imageToText = () => {
  async function query(filename: string) {
    const filePath = path.join(__dirname, filename);
    const data = fs.readFileSync(filePath);
    const response = await fetch(
      'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base',
      {
        headers: {
          Authorization: `Bearer ${environmentVars.HUGGING_FACE_TOKEN}`,
        },
        method: 'POST',
        body: data,
      }
    );
    const result = await response.json();
    return result;
  }

  query('image.jpg').then((response) => {
    console.log(JSON.stringify(response));
  });
};

export const textToImage = () => {
  async function query(data: any) {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4',
      {
        headers: {
          Authorization: `Bearer ${environmentVars.HUGGING_FACE_TOKEN}`,
        },
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }
  query({ inputs: 'Astronaut riding a horse' }).then(async (response) => {
    // Use image
    const filePath = path.join(__dirname, 'image.jpg');
    fs.writeFile(filePath, Buffer.from(await response.arrayBuffer()), (err) => {
      if (err) throw err;
      console.log('Image saved successfully!');
    });
  });
};
