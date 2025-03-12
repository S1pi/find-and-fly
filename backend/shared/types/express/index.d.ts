import {TokenData, UserWithoutPassword} from 'types/DataTypes';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserWithoutPassword | TokenData;
  }
}
