import { config } from 'dotenv';
import { z } from 'zod';
config();

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
  AWS: z.object({
    ACCESS_KEY: z.string(),
    SECRET_ACCESS_KEY: z.string(),
  }),
  WHATSAPP: z.object({
    APP_ID: z.string(),
    PERMANENT_TOKEN: z.string(),
  }),
  HUGGING_FACE_TOKEN: z.string().optional(),
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
  AWS: {
    ACCESS_KEY: process.env.AWS_ACCESS_KEY!,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  WHATSAPP: {
    APP_ID: process.env.WHATSAPP_APP_ID!,
    PERMANENT_TOKEN: process.env.WHATSAPP_PERMANENT_TOKEN!,
  },
  HUGGING_FACE_TOKEN: process.env.HUGGING_FACE_TOKEN,
};

const environmentVars = environmentVarsSchema.parse(fields);
export default environmentVars;
