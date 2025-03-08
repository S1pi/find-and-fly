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

export type {User, UserWithoutPassword, UserCreate, TokenData};
