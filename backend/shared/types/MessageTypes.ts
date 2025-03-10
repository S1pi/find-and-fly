import {Destination, UserWithoutPassword} from './DataTypes';

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

type CreatedDestinationMessage = {
  message: string;
  destination_id: number;
  destination: Destination;
};

type DeleteDestinationMessage = MessageResponse & {
  destination_id: number;
};

export type {
  MessageResponse,
  ErrorResponse,
  SuccessUserCreationResponse,
  UserDeleteResponse,
  CreatedDestinationMessage,
  DeleteDestinationMessage,
};
