// api/server.ts
import { ApolloServer } from 'apollo-server';
import { context } from './context';
import { schema } from './schema';

export const server = new ApolloServer({
  schema,
  context,
  cache: 'bounded',
  cors: {
    origin: 'https://skartner-web.vercel.app', // Replace with the allowed origin(s)
    credentials: true, // Set to true if you're using cookies or authentication headers
  },
  // @ts-ignore
  // plugins: [BASIC_LOGGING],
});
