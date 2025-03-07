import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';

import { base64ToBuffer } from './base64ToBuffer';

export const createFileFromBase64 = (content: string, filePath: string) => {
  const directory = dirname(filePath);

  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }

  writeFileSync(filePath, base64ToBuffer(content));
};
