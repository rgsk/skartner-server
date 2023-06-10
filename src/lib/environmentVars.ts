import { z } from 'zod';

const AppEnvironmentEnum = z.enum([
  'development',
  'staging',
  'production',
  'test', // jest sets the environment as test so this is added
]);

export type AppEnvironment = z.infer<typeof AppEnvironmentEnum>;

const environmentVarsSchema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  NODE_ENV: AppEnvironmentEnum,
  LOCAL_IP: z.string().optional(),
  OPENAI_API_KEY: z.string(),
  OPENAI_ORGANIZATION: z.string(),
});

const fields = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_URL: process.env.REDIS_URL,
  NODE_ENV: process.env.NODE_ENV,
  LOCAL_IP: process.env.LOCAL_IP,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_ORGANIZATION: process.env.OPENAI_ORGANIZATION,
};

const environmentVars = environmentVarsSchema.parse(fields);

export default environmentVars;
