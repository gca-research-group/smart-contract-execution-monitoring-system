import { z } from 'zod';

export const CreateClauseExecutionArgumentSchema = z.object({
  name: z.string({ message: 'NAME_IS_REQUIRED' }),
  value: z.string({ message: 'VALUE_IS_REQUIRED' }),
});

export const CreateClauseExecutionSchema = z.object({
  name: z.string({ message: 'NAME_IS_REQUIRED' }),
  arguments: z.array(CreateClauseExecutionArgumentSchema).optional(),
});

export type CreateClauseExecutionDto = z.infer<
  typeof CreateClauseExecutionSchema
>;
