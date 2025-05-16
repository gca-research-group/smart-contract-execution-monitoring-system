import { z } from 'zod';

import { BlockchainPlatform } from '@app/models/enums';

export const UpdateSmartContractClauseArgumentSchema = z.object({
  name: z.string({ message: 'NAME_IS_REQUIRED' }),
  type: z.string({ message: 'TYPE_IS_REQUIRED' }),
});

export const UpdateSmartContractClauseSchema = z.object({
  name: z.string({ message: 'NAME_IS_REQUIRED' }),
  arguments: z.array(UpdateSmartContractClauseArgumentSchema).optional(),
});

export const UpdateSmartContractSchema = z.object({
  name: z.string({ message: 'NAME_IS_REQUIRED' }),
  blockchainPlatform: z.enum([BlockchainPlatform.HYPERLEDGER_FABRIC], {
    message: 'INVALID_BLOCKCHAIN_PLATFORM',
  }),
  content: z.string().optional(),
  clauses: z.array(UpdateSmartContractClauseSchema).optional(),
});

export type UpdateSmartContractDto = z.infer<typeof UpdateSmartContractSchema>;
