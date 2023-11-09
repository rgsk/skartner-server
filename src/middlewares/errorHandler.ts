import { NextFunction, Request, Response } from 'express';
import { getOptionalProps } from 'middlewareProps';
import { Middlewares } from 'middlewares';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { data } =
    getOptionalProps<Middlewares.ErrorData>(req, Middlewares.Keys.ErrorData) ??
    {};
  console.log('Error Handler Middleware: ');
  console.log(err.message);
  console.log(data);
  res.status(500).json({ message: err.message, data: data });
};

export default errorHandler;
