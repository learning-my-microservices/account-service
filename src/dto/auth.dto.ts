import { z } from 'zod';

export const AuthDto = z.object({
  email: z.string().email('E-mail is required'),
  password: z.string().min(1, 'Password is required'),
});

export type IAuthDto = z.infer<typeof AuthDto>;
