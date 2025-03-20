import { z } from 'zod';

import { BlockchainPlatform } from '@app/models';

import { CreateSmartContractClauseSchema } from '../smart-contract-clause';

export const CreateSmartContractSchema = z.object({
  name: z.string({ message: 'NAME_IS_REQUIRED' }),
  blockchainPlatform: z.enum([BlockchainPlatform.HYPERLEDGER_FABRIC], {
    message: 'INVALID_BLOCKCHAIN_PLATFORM',
  }),
  content: z.string().optional(),
  status: z.boolean().optional(),
  remarks: z.string().optional(),
  clauses: z.array(CreateSmartContractClauseSchema).optional(),
});

export type CreateSmartContractDto = z.infer<typeof CreateSmartContractSchema>;
