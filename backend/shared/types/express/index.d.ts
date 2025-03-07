import {TokenData} from 'types/DataTypes';
// import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: TokenData;
  }
}
