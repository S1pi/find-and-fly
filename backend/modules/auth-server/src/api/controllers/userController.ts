import {NextFunction, Request, Response} from 'express';
import {TokenData} from 'types/DataTypes';
import CustomError from 'utils/CustomError';

// const getUserByToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const userToken = req.headers.authorization?.split(' ')[1];

//     console.log('User Token: ', userToken);

//     if (!userToken) {
//       next(new CustomError('Token not provided', 401));
//       return;
//     }

//     res.status(200).json({message: 'User found by token'});
//   } catch (err) {
//     next(err);
//   }
// };

const getUserByToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const testHello = 'Hello';

    const userData = req.user;

    console.log('User Data from userController: ', userData);

    res.status(200).json({message: 'User found by token', userData});
  } catch (err) {
    next(err);
  }
};

export {getUserByToken};
