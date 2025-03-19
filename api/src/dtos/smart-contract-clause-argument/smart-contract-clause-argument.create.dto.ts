import { z } from 'zod';

export const CreateSmartContractClauseArgumentSchema = z.object({
  name: z.string(),
  type: z.string(),
  clauseId: z.number().optional(),
  status: z.boolean().optional(),
  remarks: z.string().optional(),
});

export type CreateSmartContractClauseArgumentDto = z.infer<
  typeof CreateSmartContractClauseArgumentSchema
>;
