import { BadRequestException } from '@nestjs/common';

export const getExtensionFromBase64 = (content: string) => {
  if (!content.includes(';base64')) {
    throw new BadRequestException('INVALID_FILE');
  }

  return content.split(';')[0].split('/')[1];
};
