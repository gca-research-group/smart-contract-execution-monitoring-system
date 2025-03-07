import { z } from 'zod';

import { BlockchainType } from '@app/models';

export const CreateSmartContractSchema = z.object({
  name: z.string(),
  blockchainType: z.enum([BlockchainType.HYPERLEDGER_FABRIC]),
  content: z.string(),
  status: z.boolean().optional(),
  remarks: z.string().optional(),
});

export type CreateSmartContractDto = z.infer<typeof CreateSmartContractSchema>;
