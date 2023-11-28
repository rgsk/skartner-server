import { getImagesForWord } from 'lib/thirdPartyUtils';

export async function example() {
  console.log('example function ran');

  const imagesUrls = await getImagesForWord({ word: 'hen', numberOfImages: 3 });
  console.log(imagesUrls);
}
