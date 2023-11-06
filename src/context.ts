import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import firebaseAdmin from 'lib/firebaseAdmin';
import pubsub from 'pubsub';
import { db } from './db';

export const verifyToken = async (token: string) => {
  const decodedIdToken = await firebaseAdmin.auth().verifyIdToken(token);
  const user = await db.user.findUnique({
    where: { email: decodedIdToken.email },
  });
  return { decodedIdToken, user };
};

export const getContext = async (token?: string) => {
  try {
    if (token) {
      const { decodedIdToken, user } = await verifyToken(token);
      // console.log(`authenticated: ${user!.email}`);
      return {
        db,
        pubsub,
        decodedIdToken,
        user,
      };
    }
  } catch (err) {
    // console.log(`Graphql_Get_Context_Error: ${err}`);
  }
  return {
    db,
    pubsub,
    decodedIdToken: null,
    user: null,
  };
};

export const createContext = async (
  baseContext: ExpressContextFunctionArgument
) => {
  const authorizationHeader = baseContext.req.get('Authorization');
  const idToken = authorizationHeader?.replace('Bearer ', '');
  return { ...baseContext, ...(await getContext(idToken)) };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
