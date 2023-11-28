import { NextFunction, Request, Response } from 'express';

const conditionalMiddleware = (
  condition: (req: Request) => boolean,
  middleware: (req: Request, res: Response, next: NextFunction) => void
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (condition(req)) {
      return middleware(req, res, next);
    } else {
      return next();
    }
  };
};

export default conditionalMiddleware;
