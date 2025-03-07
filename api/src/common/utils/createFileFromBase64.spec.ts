import { existsSync, rmSync } from 'fs';
import { dirname, join } from 'path';

import { PUBLIC_FOLDER } from '@app/const';

import { FILE_CONTENT, FILE_EXT } from './__tests__/const';
import { createFileFromBase64 } from './createFileFromBase64';

const filename = `test.${FILE_EXT}`;
const filePath = join(PUBLIC_FOLDER, 'tests', filename);

describe('createFileFromBase64', () => {
  it('should create the file', () => {
    createFileFromBase64(FILE_CONTENT, filePath);
    expect(existsSync(filePath)).toBeTruthy();
  });

  afterAll(() => {
    rmSync(dirname(filePath), { recursive: true, force: true });
  });
});
