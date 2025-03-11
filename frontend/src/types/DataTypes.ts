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

type DestinationWithFileData = Destination & {
  file_name: string;
  file_url: string;
};

type DestinationCreate = Omit<Destination, 'id' | 'created_at' | 'user_id'> & {
  user_id?: number;
  file_data?: FileData;
};

type SubDestination = {
  id: number;
  destination_id: number;
  name: string;
  description: string;
  rating: number;
  user_id: number;
  created_at: Date | string;
};

type SubDestinationCreate = Omit<
  SubDestination,
  'id' | 'created_at' | 'user_id'
> & {
  user_id?: number;
};

type Review = {
  id: number;
  user_id: number;
  destination_id: number;
  rating: number;
  trip_type: string;
  comment: string;
  likes: number;
  dislikes: number;
  created_at: Date | string;
};

type ReviewCreate = Omit<Review, 'id' | 'created_at' | 'likes' | 'dislikes'>;

type ReviewAction = {
  id: number;
  user_id: number;
  review_id: number;
  reaction: string;
  created_at: Date | string;
};

type FileData = {
  file_name: string;
  file_url: string;
};

export type {
  User,
  UserWithoutPassword,
  UserCreate,
  TokenData,
  Destination,
  DestinationWithFileData,
  DestinationCreate,
  SubDestination,
  SubDestinationCreate,
  Review,
  ReviewCreate,
  ReviewAction,
  FileData,
};
