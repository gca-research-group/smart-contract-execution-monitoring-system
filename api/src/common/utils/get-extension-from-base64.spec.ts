import { FILE_CONTENT, FILE_EXT } from './__tests__/const';
import { getExtensionFromBase64 } from './get-extension-from-base64';

describe('getExtensionFromBase64', () => {
  it('should throw an exception if the content is not a base64', () => {
    expect(() => getExtensionFromBase64('content')).toThrow('INVALID_FILE');
  });

  it('should extract the file extension', () => {
    const ext = getExtensionFromBase64(FILE_CONTENT);
    expect(ext).toEqual(FILE_EXT);
  });
});
