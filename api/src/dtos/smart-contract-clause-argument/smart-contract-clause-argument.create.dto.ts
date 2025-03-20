import { z } from 'zod';

export const CreateSmartContractClauseArgumentSchema = z.object({
  name: z.string({ message: 'NAME_IS_REQUIRED' }),
  type: z.string({ message: 'TYPE_IS_REQUIRED' }),
  clauseId: z.number().optional(),
  status: z.boolean().optional(),
  remarks: z.string().optional(),
});

export type CreateSmartContractClauseArgumentDto = z.infer<
  typeof CreateSmartContractClauseArgumentSchema
>;
