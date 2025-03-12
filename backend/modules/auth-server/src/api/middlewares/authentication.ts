import {NextFunction, Request, Response} from 'express';
import 'shared/config/envConfig'; // Needed to load the .env file
import jwt from 'jsonwebtoken';
import {TokenData} from 'types/DataTypes';
import {getUserById} from '../models/userModel';
import CustomError from 'utils/CustomError';

const userAuthenticator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userToken = req.headers.authorization?.split(' ')[1];

    // console.log('User Token: ', userToken);

    if (!userToken) {
      res.status(401).json({message: 'Token not provided'});
      return;
    }

    // Check if the token is valid
    if (!process.env.JWT_SECRET) {
      res.status(500).json({message: 'JWT_SECRET is not defined'});
      return;
    }

    const userDecoded = jwt.verify(
      userToken,
      process.env.JWT_SECRET,
    ) as TokenData;

    const user = await getUserById(userDecoded.id);

    if (!user) {
      next(new CustomError('Token is not valid', 403));
      return;
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

export default userAuthenticator;
