import { z } from 'zod';

export const EventHandlerClauseArgumentsSchema = z.object({
  id: z.string({ message: 'ARGUMENT_IS_REQUIRED' }),
  value: z.string({ message: 'ARGUMENT_VALUE_IS_REQUIRED' }),
});

export const EventHandlerSchema = z.object({
  blockchainId: z.string({ message: 'BLOCKCHAIN_IS_REQUIRED' }),
  smartContractId: z.string({ message: 'SMART_CONTRACT_IS_REQUIRED' }),
  clauseId: z.string({ message: 'CLAUSE_IS_REQUIRED' }),
  clauseArguments: z.array(EventHandlerClauseArgumentsSchema).optional(),
});

export type EventHandlerDto = z.infer<typeof EventHandlerSchema>;
