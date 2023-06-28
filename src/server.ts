import { config } from 'dotenv';
config();

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import { context } from 'context';
import cors from 'cors';
import { db } from 'db';
import express from 'express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import Keyv from 'keyv';
import environmentVars from 'lib/environmentVars';
import fileLogger from 'lib/fileLogger';
import rootRouter from 'rootRouter';
import { schema } from 'schema';
import { WebSocketServer } from 'ws';

// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
app.use(express.json());
app.use(cors());
app.use('/', rootRouter);

const httpServer = createServer(app);

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});
// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ schema: schema }, wsServer);

// Set up ApolloServer.
export const server = new ApolloServer({
  schema,
  cache: new KeyvAdapter(new Keyv(environmentVars.REDIS_URL)),
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

(async () => {
  await server.start();
  app.use(
    '/graphql',
    // @ts-ignore
    expressMiddleware(server, {
      context: () => context,
    })
  );

  const PORT = environmentVars.PORT;
  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });
})();

const method = async () => {
  const users = await db.user.findMany({
    include: {
      relationRoleToUserAsAssigner: { include: { role: true } },
    },
  });
  fileLogger.logToJsFile({ users });

  const roles = await db.role.findMany({
    include: {
      relationRoleToUserAsRole: { include: { assigner: true } },
    },
  });
  fileLogger.logToJsFile({ roles });
};
method();
//
