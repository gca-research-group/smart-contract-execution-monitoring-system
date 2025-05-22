import { FILE_CONTENT } from './__tests__/const';
import { base64ToBuffer } from './base64-to-buffer';

describe('base64ToBuffer', () => {
  it('should throw an exception if the content is empty', () => {
    expect(() => base64ToBuffer('')).toThrow('FILE_CONTENT_IS_EMPTY');
  });

  it('should throw an exception if file is not a base64', () => {
    expect(() => base64ToBuffer('content')).toThrow('INVALID_FILE');
  });

  it('should transform base64 to Buffer', () => {
    const base64Content = base64ToBuffer(FILE_CONTENT);
    expect(base64Content).toBeTruthy();
  });
});
