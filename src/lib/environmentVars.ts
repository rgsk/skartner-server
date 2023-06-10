export type TAppEnvironment = 'development' | 'staging' | 'production';
const environmentVars = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_URL: process.env.REDIS_URL,
  NODE_ENV: process.env.NODE_ENV as TAppEnvironment | undefined,
  LOCAL_IP: process.env.LOCAL_IP,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_ORGANIZATION: process.env.OPENAI_ORGANIZATION,
};
export default environmentVars;
