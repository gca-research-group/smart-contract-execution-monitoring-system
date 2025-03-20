import { ZodSchema } from 'zod';

import { PipeTransform, BadRequestException, Logger } from '@nestjs/common';

export class ZodValidationPipe implements PipeTransform {
  private readonly logger = new Logger(ZodValidationPipe.name);
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue: unknown = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      const messages = (error as { issues: { message: string }[] }).issues.map(
        (item) => item.message,
      );
      throw new BadRequestException(messages[0]);
    }
  }
}
