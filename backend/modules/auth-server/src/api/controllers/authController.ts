import e, {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CustomError from 'shared/utils/CustomError';
import {createUser, getUserByUsername} from '../models/userModel';
import {TokenData, UserCreate, UserWithoutPassword} from 'types/DataTypes';
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
      next(new CustomError('Username or password is incorrect', 401));
      return;
    }

    if (!process.env.JWT_SECRET) {
      next(new CustomError('JWT_SECRET is not defined', 500));
      return;
    }

    const userData: UserWithoutPassword = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    };

    const userTokenData: TokenData = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    console.log('User Token Data: ', userTokenData);

    const token = jwt.sign(userTokenData, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: userData,
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
