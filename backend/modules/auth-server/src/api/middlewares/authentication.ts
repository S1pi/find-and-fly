import {NextFunction, Request, Response} from 'express';
import 'shared/config/envConfig'; // Needed to load the .env file
import jwt from 'jsonwebtoken';
import {TokenData} from 'types/DataTypes';

const userAuthenticator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userToken = req.headers.authorization?.split(' ')[1];

    console.log('User Token: ', userToken);

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

    req.user = userDecoded;

    console.log('User req object from authentication.ts: ', req.user);

    // next();
  } catch (err) {
    next(err);
  }
};

export default userAuthenticator;
