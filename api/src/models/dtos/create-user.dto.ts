import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string(),
  password: z.string().min(6),
  email: z.string().email(),
  photo: z.string().optional(),
  remarks: z.string().optional(),
  status: z.boolean().optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
