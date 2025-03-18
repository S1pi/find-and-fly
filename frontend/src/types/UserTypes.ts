import {UserWithoutPassword} from './DataTypes';

type Credentials = {
  username: string;
  password: string;
};

type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: UserWithoutPassword | null;
  loading: boolean;
  handleLogin: (credentials: Credentials) => void;
  handleLogout: () => void;
  handleAutoLogin: () => void; // Implement this later
};

export type {AuthContextType, Credentials, RegisterCredentials};
