export type TAppEnvironment = 'development' | 'staging' | 'production';
const environmentVars = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV as TAppEnvironment | undefined,
  LOCAL_IP: process.env.LOCAL_IP,
};
export default environmentVars;
