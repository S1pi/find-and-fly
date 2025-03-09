import {NextFunction, Request, Response} from 'express';
import {TokenData, User, UserWithoutPassword} from 'types/DataTypes';
import CustomError from 'utils/CustomError';
import {changeUserData, getAllUsers, getUserById} from '../models/userModel';
import bcrypt from 'bcryptjs';

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

const salt = bcrypt.genSaltSync(12);

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

const fetchUserById = async (
  req: Request<{id: string}>,
  res: Response<{message: string; user: UserWithoutPassword}>,
  next: NextFunction,
): Promise<void> => {
  // Fetch user by ID
  try {
    const userId = req.params.id;
    const user = await getUserById(Number(userId));
    res.status(200).json({message: `Username: ${user.username} found: `, user});
  } catch (err) {
    next(err);
  }
};

const putUserData = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newUserdata = req.body;

    const authendticatedUser = req.user;

    if (!authendticatedUser) {
      throw new CustomError('User not authendticated', 401);
    }
    if (newUserdata.password) {
      newUserdata.password = await bcrypt.hash(newUserdata.password, salt);
    }

    const newData = await changeUserData(authendticatedUser.id, newUserdata);

    res.status(200).json({message: 'Change user data'});
  } catch (err) {
    next(err);
  }
};

export {getUserByToken, fetchAllUsers, fetchUserById, putUserData};
