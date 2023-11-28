import { getImagesForWord } from 'lib/thirdPartyUtils';

export async function example() {
  console.log('example function ran');

  const imagesUrls = await getImagesForWord('hen');
  console.log(imagesUrls);
}
