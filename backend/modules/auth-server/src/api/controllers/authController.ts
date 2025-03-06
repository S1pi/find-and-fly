import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CustomError from 'shared/utils/CustomError';
import {createUser, getUserByUsername} from '../models/userModel';
import {UserCreate} from 'types/DataTypes';
import {SuccessUserCreationResponse} from 'types/MessageTypes';

const salt = bcrypt.genSaltSync(10);

const loginUser = async (
  req: Request<{}, {}, {username: string; password: string}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {username, password} = req.body;
    const user = await getUserByUsername(username);

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      next(new CustomError('Username or password is incorrect', 403));
      return;
    }

    if (!process.env.JWT_SECRET) {
      next(new CustomError('JWT_SECRET is not defined', 500));
      return;
    }

    const userReturn = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(userReturn, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
  } catch (err) {
    next(err);
  }
};

const registerUser = async (
  req: Request<{}, {}, UserCreate>,
  res: Response, // Check type for response message
  next: NextFunction,
) => {
  try {
    const user = req.body;
    user.password = await bcrypt.hash(user.password, salt);

    const createdUser = await createUser(user);

    if (!createdUser) {
      next(new CustomError('Something went wrong creating user', 500));
      return;
    }

    const response: SuccessUserCreationResponse = {
      message: 'User created successfully',
      user: createdUser,
    };

    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      if (err.message.includes('Duplicate entry')) {
        next(new CustomError('Username or email already exists', 400));
        return;
      } else {
        next(new CustomError(err.message, 500));
        return;
      }
    }
  }
};

export {loginUser, registerUser};
