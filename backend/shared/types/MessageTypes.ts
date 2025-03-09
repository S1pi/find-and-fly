import {UserWithoutPassword} from './DataTypes';

type MessageResponse = {
  message: string;
};

type ErrorResponse = MessageResponse & {
  stack?: string;
};

type SuccessUserCreationResponse = {
  message: string;
  user: UserWithoutPassword;
};

type UserDeleteResponse = {
  message: string;
  user_id: number;
};

export type {
  MessageResponse,
  ErrorResponse,
  SuccessUserCreationResponse,
  UserDeleteResponse,
};
