import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import firebaseAdmin from 'lib/firebaseAdmin';
import pubsub from 'pubsub';
import { db } from './db';

export const createContext = async (
  baseContext: ExpressContextFunctionArgument
) => {
  try {
    const authorizationHeader = baseContext.req.get('Authorization');
    if (!authorizationHeader) {
      throw new Error('Authorization header not present');
    }
    const idToken = authorizationHeader.replace('Bearer ', '');
    if (idToken) {
      const decodedIdToken = await firebaseAdmin.auth().verifyIdToken(idToken);
      const user = await db.user.findUnique({
        where: { email: decodedIdToken.email },
      });
      // console.log(`authenticated: ${user!.email}`);
      return {
        ...baseContext,
        db,
        pubsub,
        decodedIdToken,
        user,
      };
    } else {
      throw new Error('token not present');
    }
  } catch (err) {
    // console.log(`Graphql_Create_Context_Error: ${err}`);
  }
  return {
    ...baseContext,
    db,
    pubsub,
    user: null,
    decodedIdToken: null,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
