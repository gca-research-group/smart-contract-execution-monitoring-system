import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string({ message: 'NAME_IS_REQUIRED' }),
  password: z
    .string()
    .min(6, { message: 'PASSWORD_LENGTH_MUST_BE_AT_LEAST_SIX' }),
  email: z.string().email({ message: 'EMAIL_IS_REQUIRED' }),
  photo: z.string().optional(),
  remarks: z.string().optional(),
  status: z.boolean().optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
