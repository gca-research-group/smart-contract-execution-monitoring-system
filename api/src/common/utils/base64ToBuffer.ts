import { BadRequestException } from '@nestjs/common';

export const base64ToBuffer = (content: string) => {
  if (!content) {
    throw new BadRequestException('FILE_CONTENT_IS_EMPTY');
  }

  if (!content.includes(';base64')) {
    throw new BadRequestException('INVALID_FILE');
  }

  const data = content.replace(/^data:\w+\/\w+;base64,/, '');
  return Buffer.from(data, 'base64');
};
