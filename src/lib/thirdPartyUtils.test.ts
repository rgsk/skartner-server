import { composeS3Url, decomposeS3Url } from './thirdPartyUtils'; // Adjust the import path accordingly

describe('composeS3Url', () => {
  test('should compose a valid S3 URL', () => {
    const result = composeS3Url({
      bucket: 'myBucket',
      region: 'us-east-1',
      key: 'file.txt',
    });
    expect(result).toBe('https://myBucket.s3.us-east-1.amazonaws.com/file.txt');
  });
  test('should compose a valid S3 URL real example', () => {
    const result = composeS3Url({
      bucket: 'skartner',
      region: 'ap-south-1',
      key: 'toilet.mp3',
    });
    expect(result).toBe(
      'https://skartner.s3.ap-south-1.amazonaws.com/toilet.mp3'
    );
  });
});

describe('decomposeS3Url', () => {
  test('should decompose a valid S3 URL', () => {
    const url = 'https://example.s3.eu-west-2.amazonaws.com/path/to/file.jpg';
    const result = decomposeS3Url(url);

    expect(result).toEqual({
      bucket: 'example',
      region: 'eu-west-2',
      key: 'path/to/file.jpg',
    });
  });

  test('should decompose a valid S3 URL real example', () => {
    const url = 'https://skartner.s3.ap-south-1.amazonaws.com/toilet.mp3';
    const result = decomposeS3Url(url);

    expect(result).toEqual({
      bucket: 'skartner',
      region: 'ap-south-1',
      key: 'toilet.mp3',
    });
  });

  test('should throw an error for an invalid URL', () => {
    const invalidUrl = 'https://invalid-url';
    expect(() => decomposeS3Url(invalidUrl)).toThrowError('No match found.');
  });
});
