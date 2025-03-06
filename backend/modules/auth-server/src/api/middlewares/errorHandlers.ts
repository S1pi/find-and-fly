import {NextFunction, Request, Response} from 'express';
import CustomError from 'shared/utils/CustomError';
import {ErrorResponse} from 'types/MessageTypes';

const notFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = new CustomError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
) => {
  const statusCode = error.status || 500;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
};

// const validationErrorHandler = (
//   req: Request,
//   _res: Response,
//   next: NextFunction,
// ) => {
//   // const errors = validationResult(req);

//   // Change error: any to correct type of error object from validationResult
//   if (!errors.isEmpty()) {
//     const messages: string = errors
//       .array()
//       .map((error: any) => `{Error: ${error.msg}; Type: ${error.type}`)
//       .join(', ');
//     next(new CustomError(`Validation Error: ${messages}`, 400));
//   }
//   next();
// };

export {notFoundErrorHandler, errorHandler};
