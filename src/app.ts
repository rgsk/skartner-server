import { config } from 'dotenv';
config();
// api/index.ts
import { server } from './server';
import environmentVars from 'lib/environmentVars';
server.listen({ port: environmentVars.PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
