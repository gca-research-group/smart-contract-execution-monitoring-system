import { z } from 'zod';

const ArgumentSchema = z.object({
  id: z.string({ message: 'ARGUMENT_ID_IS_REQUIRED' }),
  name: z.string({ message: 'ARGUMENT_NAME_IS_REQUIRED' }),
  value: z.string({ message: 'ARGUMENT_VALUE_IS_REQUIRED' }),
});

const ClauseSchema = z.object({
  id: z.string({ message: 'CLAUSE_ID_IS_REQUIRED' }),
  name: z.string({ message: 'CLAUSE_NAME_IS_REQUIRED' }),
});

const SmartContractSchema = z.object({
  id: z.string({ message: 'SMART_CONTRACT_ID_IS_REQUIRED' }),
  name: z.string({ message: 'SMART_CONTRACT_NAME_IS_REQUIRED' }),
});

const PayloadSchema = z.object({
  smartContract: z.object({ shape: SmartContractSchema }),
  clause: z.object({ shape: ClauseSchema }),
  clauseArguments: z.array(ArgumentSchema),
});

export const UpdateSmartContractExecutionSchema = z.object({
  payload: z.object({ shape: PayloadSchema }),
  result: z.any({ message: 'RESULT_IS_REQUIRED' }),
  status: z.string(),
});

export type UpdateSmartContractExecutionDto = z.infer<
  typeof UpdateSmartContractExecutionSchema
>;
