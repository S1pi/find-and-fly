import {Request} from 'express';

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  created_at: Date | string;
};

type UserCreate = Omit<User, 'id' | 'created_at' | 'role'> & {role?: string};

type UserWithoutPassword = Omit<User, 'password'>;

type TokenData = Omit<UserWithoutPassword, 'email' | 'created_at'> & {
  iat?: number;
  exp?: number;
};

type Destination = {
  id: number;
  name: string;
  country: string;
  description: string;
  user_id: number;
  created_at: Date | string;
  category_id: number;
};

type DestinationCreate = Omit<Destination, 'id' | 'created_at' | 'user_id'> & {
  user_id?: number;
};

type SubDestination = {
  id: number;
  destination_id: number;
  name: string;
  description: string;
  user_id: number;
  created_at: Date | string;
};

export type {
  User,
  UserWithoutPassword,
  UserCreate,
  TokenData,
  Destination,
  DestinationCreate,
  SubDestination,
};
