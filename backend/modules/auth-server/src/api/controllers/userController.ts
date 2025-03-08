import {NextFunction, Request, Response} from 'express';
import {TokenData} from 'types/DataTypes';
import CustomError from 'utils/CustomError';
import {getAllUsers} from '../models/userModel';

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
    if (!req.user) {
      throw new CustomError('User not found', 404);
    }

    const userData: TokenData = req.user;

    console.log('User Data from userController: ', userData);

    res.status(200).json({message: 'User found by token', userData});
  } catch (err) {
    next(err);
  }
};

const fetchAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Get all users from the database
    const userList = await getAllUsers();

    res.status(200).json({message: 'All users: ', userList});
  } catch (err) {
    next(err);
  }
};

export {getUserByToken, fetchAllUsers};
