import { z } from 'zod';

export const UpdateExecutionResultSchema = z.object({
  smartContractId: z.string({ message: 'SMART_CONTRACT_IS_REQUIRED' }),
  event: z.any({ message: 'EVENT_IS_REQUIRED' }),
});

export type UpdateExecutionResultDto = z.infer<
  typeof UpdateExecutionResultSchema
>;
