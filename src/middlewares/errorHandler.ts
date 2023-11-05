import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Error Handler Middleware: ');
  console.log(err.message);
  res.status(500).json({ message: err.message });
};

export default errorHandler;
