import { db } from 'db';
import { NextFunction, Request, Response } from 'express';

const authorize =
  (permissionName: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the user via token
      const user = await db.user.findUnique({ where: { email: 'serious' } });
      if (user) {
      }
    } catch (err) {
      next(err);
    }
  };

export default authorize;
