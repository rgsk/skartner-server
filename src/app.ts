import { config } from 'dotenv';
config();
// api/index.ts
import environmentVars from 'lib/environmentVars';
import { server } from './server';
server.listen({ port: environmentVars.PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
