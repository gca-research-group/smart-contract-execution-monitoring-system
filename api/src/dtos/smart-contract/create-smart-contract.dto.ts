import { z } from 'zod';

import { BlockchainPlatform } from '@app/models';

export const CreateSmartContractSchema = z.object({
  name: z.string(),
  blockchainPlatform: z.enum([BlockchainPlatform.HYPERLEDGER_FABRIC]),
  content: z.string().optional(),
  status: z.boolean().optional(),
  remarks: z.string().optional(),
});

export type CreateSmartContractDto = z.infer<typeof CreateSmartContractSchema>;
