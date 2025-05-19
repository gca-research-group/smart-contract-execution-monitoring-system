import { z } from 'zod';

export const UpdateClauseExecutionArgumentSchema = z.object({
  name: z.string({ message: 'NAME_IS_REQUIRED' }),
  value: z.string({ message: 'VALUE_IS_REQUIRED' }),
});

export const UpdateClauseExecutionSchema = z.object({
  name: z.string({ message: 'NAME_IS_REQUIRED' }),
  arguments: z.array(UpdateClauseExecutionArgumentSchema).optional(),
});

export type UpdateClauseExecutionDto = z.infer<
  typeof UpdateClauseExecutionSchema
>;
