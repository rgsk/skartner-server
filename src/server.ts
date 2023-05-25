// api/server.ts
import { ApolloServer } from 'apollo-server';
import { context } from './context';
import { schema } from './schema';

export const server = new ApolloServer({
  schema,
  context,
  cache: 'bounded',
  cors: {
    origin: '*', // Replace with the allowed origin(s)
  },
  // @ts-ignore
  // plugins: [BASIC_LOGGING],
});
