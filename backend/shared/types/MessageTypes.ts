import {
  Destination,
  Review,
  SubDestination,
  UserWithoutPassword,
} from './DataTypes';

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
  destination_id?: number;
  subDestination_id?: number;
  destination: Destination | SubDestination;
};

type DeleteDestinationMessage = MessageResponse & {
  destination_id: number;
};

type CreatedReviewMessage = MessageResponse & {
  review_id: number;
  review: Review;
};

type DeleteReviewMessage = MessageResponse & {
  review_id: number;
};

export type {
  MessageResponse,
  ErrorResponse,
  SuccessUserCreationResponse,
  UserDeleteResponse,
  CreatedDestinationMessage,
  DeleteDestinationMessage,
  CreatedReviewMessage,
  DeleteReviewMessage,
};
