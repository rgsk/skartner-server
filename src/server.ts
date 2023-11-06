import { config } from 'dotenv';
config();

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import { createContext, verifyToken } from 'context';
import cors from 'cors';
import express from 'express';
import { applyMiddleware } from 'graphql-middleware';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import Keyv from 'keyv';
import environmentVars from 'lib/environmentVars';
import errorHandler from 'middlewares/errorHandler';
import rootRouter from 'rootRouter';
import { permissions } from 'rules';
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

app.use(errorHandler);

const httpServer = createServer(app);

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});
// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer(
  {
    schema: schema,
    onConnect: async (ctx) => {
      // ctx.connectionParams will contain the headers
      const authorizationHeader = ctx.connectionParams?.Authorization as string;
      if (authorizationHeader) {
        const idToken = authorizationHeader.replace('Bearer ', '');
        const { decodedIdToken, user } = await verifyToken(idToken);
        return { decodedIdToken, user };
      }
      return false;
    },
  },
  wsServer
);

// Set up ApolloServer.
export const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
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
    expressMiddleware(server, {
      context: createContext,
    })
  );

  const PORT = environmentVars.PORT;
  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });
})();
