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
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
      throw new Error('Authorization header not present');
    }
    const idToken = authorizationHeader.split(' ')[1];
    if (idToken) {
      const decodedIdToken = await firebaseAdmin.auth().verifyIdToken(idToken);
      const user = await db.user.findUnique({
        where: { email: decodedIdToken.email },
      });

      const props: Middlewares.Authenticate = { decodedIdToken, user };
      addProps(req, props, Middlewares.Keys.authenticate);
      next();
    } else {
      throw new Error('token not present');
    }
  } catch (err) {
    next(err);
  }
};

export default authenticate;
