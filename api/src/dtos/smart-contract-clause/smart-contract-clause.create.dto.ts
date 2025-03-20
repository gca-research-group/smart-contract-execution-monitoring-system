import { z } from 'zod';

import { CreateSmartContractClauseArgumentSchema } from '../smart-contract-clause-argument';

export const CreateSmartContractClauseSchema = z.object({
  name: z.string({ message: 'NAME_IS_REQUIRED' }),
  smartContractId: z.number().optional(),
  status: z.boolean().optional(),
  remarks: z.string().optional(),
  arguments: z.array(CreateSmartContractClauseArgumentSchema).optional(),
});

export type CreateSmartContractClauseDto = z.infer<
  typeof CreateSmartContractClauseSchema
>;
