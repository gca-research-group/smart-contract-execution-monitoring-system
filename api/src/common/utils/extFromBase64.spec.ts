import { FILE_CONTENT, FILE_EXT } from './__tests__/const';
import { extFromBase64 } from './extFromBase64';

describe('extFromBase64', () => {
  it('should throw an exception if the content is not a base64', () => {
    expect(() => extFromBase64('content')).toThrow('INVALID_FILE');
  });

  it('should extract the file extension', () => {
    const ext = extFromBase64(FILE_CONTENT);
    expect(ext).toEqual(FILE_EXT);
  });
});
