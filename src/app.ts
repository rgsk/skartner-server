import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(__dirname, '..', 'envs', '.env') });
// api/index.ts
import { environmentVariables } from 'lib/environmentVariables';
import { server } from './server';
server.listen({ port: environmentVariables.PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
