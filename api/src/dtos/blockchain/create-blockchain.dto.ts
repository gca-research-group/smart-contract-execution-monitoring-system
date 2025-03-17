import { z } from 'zod';

import { BlockchainPlatform } from '@app/models';

export const CreateBlockchainSchema = z.object({
  name: z.string(),
  type: z.enum([BlockchainPlatform.HYPERLEDGER_FABRIC]),
  parameters: z.string().optional(),
  status: z.boolean().optional(),
  remarks: z.string().optional(),
});

export type CreateBlockchainDto = z.infer<typeof CreateBlockchainSchema>;
