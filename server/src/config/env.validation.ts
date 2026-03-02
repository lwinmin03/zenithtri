
import { z } from 'zod';

export const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number().default(5432),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),
    DATABASE: z.string(),
    DB_POOL_SIZE: z.coerce.number().default(3),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validate(config: Record<string, unknown>) {
    const result = envSchema.safeParse(config);

    if (!result.success) {
        console.error(' Invalid environment variables:', result.error.format());
        throw new Error('Invalid environment variables');
    }

    return result.data;
}