require('dotenv').config();
// api/index.ts
import { environmentVariables } from './lib/environmentVariables';
import { server } from './server';
server.listen({ port: environmentVariables.PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
