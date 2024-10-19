import { z } from 'zod';

export const RabbitMQDto = z.object({
  accountId: z.string().min(1, 'accountId is required'),
  title: z.string().min(1, 'title is required'),
  message: z.string().nullish(),
});

export type IRabbitMQDto = z.infer<typeof RabbitMQDto>;
