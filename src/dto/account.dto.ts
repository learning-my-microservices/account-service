import { z } from 'zod';
import { AuthDto } from './auth.dto';

export const AccountDto = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  personalDoc: z.string().min(1, 'Personal document is required'),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

export type IAccountDto = z.infer<typeof AccountDto>;

const AccountWithAuth = AccountDto.merge(AuthDto);

export type IAccountWithAuth = z.infer<typeof AccountWithAuth>;
