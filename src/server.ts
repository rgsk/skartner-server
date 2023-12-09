import { config } from 'dotenv';
config();

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import permissions from 'constants/permissions';
import { createContext, verifyToken } from 'context';
import cors from 'cors';
import express, { Request } from 'express';
import { applyMiddleware } from 'graphql-middleware';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import Keyv from 'keyv';
import environmentVars from 'lib/environmentVars';
import authenticate from 'middlewares/authenticate';
import authorize from 'middlewares/authorize';
import conditionalMiddleware from 'middlewares/conditionalMiddleware';
import errorHandler from 'middlewares/errorHandler';
import rootRouter from 'rootRouter';
import { graphqlPermissions } from 'rules';
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

    // we can prevent connection to websocket if certain conditions are not met like below
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
  schema: applyMiddleware(schema, graphqlPermissions),
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
  const condition = (req: Request) => {
    return req.path === '/' && req.method === 'GET';
  };

  app.use(
    '/graphql',
    conditionalMiddleware(condition, authenticate),
    conditionalMiddleware(
      condition,
      authorize(permissions['Access Graphql Playground'].key)
    ),
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

