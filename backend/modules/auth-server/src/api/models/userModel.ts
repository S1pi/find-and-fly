import {User, UserCreate, UserWithoutPassword} from 'types/DataTypes';
import promisePool from 'shared/database/connection';
import {ResultSetHeader, RowDataPacket} from 'mysql2';
import CustomError from 'shared/utils/CustomError';

const getUserByUsername = async (username: string): Promise<User> => {
  const query = 'SELECT * FROM users WHERE username = ?';

  const [rows] = await promisePool.execute<RowDataPacket[] & User[]>(query, [
    username,
  ]);

  console.log('userModel [rows]: ', rows);

  if (rows.length === 0) {
    throw new CustomError('User not found', 404);
  }

  return rows[0];
};

const createUser = async (user: UserCreate): Promise<UserWithoutPassword> => {
  const role = 'user'; // Default role for new users if not provided
  const query =
    'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';

  const options = [user.username, user.email, user.password, user.role || role];

  const [result] = await promisePool.execute<ResultSetHeader>(query, options);

  console.log('userModel [result]: ', result);

  if (!result.insertId) {
    throw new CustomError('Error creating user', 500);
  }

  return {
    id: result.insertId,
    username: user.username,
    email: user.email,
    role,
    created_at: new Date(),
  };
};

// const

export {getUserByUsername, createUser};
