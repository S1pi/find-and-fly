import {TokenData} from 'types/DataTypes';

declare module 'express-serve-static-core' {
  interface Request {
    user?: TokenData;
  }
}
