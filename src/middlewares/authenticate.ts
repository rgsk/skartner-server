import { db } from 'db';
import { NextFunction, Request, Response } from 'express';
import firebaseAdmin from 'lib/firebaseAdmin';
import { addProps } from 'middlewareProps';
import { Middlewares } from 'middlewares';

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryToken = req.query['token'];
    const authorizationHeader = req.header('Authorization');

    if (queryToken) {
      if (typeof queryToken !== 'string') {
        throw new Error('query token must be string');
      }
    } else {
      if (!authorizationHeader) {
        throw new Error('Authorization Header not present');
      }
    }

    const idToken = queryToken || authorizationHeader?.split(' ')[1];
    if (idToken) {
      const decodedIdToken = await firebaseAdmin.auth().verifyIdToken(idToken);
      const user = await db.user.findUnique({
        where: { email: decodedIdToken.email },
      });

      const props: Middlewares.Authenticate = { decodedIdToken, user };
      addProps(req, props, Middlewares.Keys.Authenticate);
      next();
    } else {
      throw new Error('token not present');
    }
  } catch (err) {
    next(err);
  }
};

export default authenticate;
