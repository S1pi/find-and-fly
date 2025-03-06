import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CustomError from 'shared/utils/CustomError';
import {getUserByUsername} from '../models/authModel';

const login = async (
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
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.created_at,
    };

    const token = jwt.sign(userReturn, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  } catch (err) {
    next(err);
  }
};
