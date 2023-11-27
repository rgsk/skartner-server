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

  FIREBASE: z.object({
    PROJECT_ID: z.string(),
    PRIVATE_KEY: z.string(),
    CLIENT_EMAIL: z.string(),
  }),
});

const fields: z.infer<typeof environmentVarsSchema> = {
  PORT: process.env.PORT!,
  DATABASE_URL: process.env.DATABASE_URL!,
  NODE_ENV: process.env.NODE_ENV! as AppEnvironment,
  LOCAL_IP: process.env.LOCAL_IP!,
  REDIS_URL: process.env.REDIS_URL!,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
  OPENAI_ORGANIZATION: process.env.OPENAI_ORGANIZATION!,
  FIREBASE: {
    PROJECT_ID: process.env.FIREBASE_PROJECT_ID!,
    PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY!,
    CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL!,
  },
};

const environmentVars = environmentVarsSchema.parse(fields);
console.log({ environmentVars });
export default environmentVars;
