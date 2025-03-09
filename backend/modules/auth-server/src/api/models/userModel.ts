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

const getAllUsers = async (): Promise<UserWithoutPassword[]> => {
  const query = 'SELECT id, username, email, role, created_at FROM users';

  const [rows] = await promisePool.execute<
    RowDataPacket[] & UserWithoutPassword[]
  >(query);

  if (rows.length === 0) {
    throw new CustomError('No users found', 404);
  }

  console.log('UserList from userModel', rows);

  return rows;
};

const getUserById = async (id: number): Promise<UserWithoutPassword> => {
  const query =
    'SELECT id, username, email, role, created_at FROM users WHERE id = ?';

  const [rows] = await promisePool.execute<RowDataPacket[] & User[]>(query, [
    id,
  ]);

  console.log('userModel [rows]: ', rows);

  if (rows.length === 0) {
    throw new CustomError(`User id: ${id} not found`, 404);
  }

  return rows[0];
};

const changeUserData = async (
  userId: number,
  user: Partial<User>,
): Promise<UserWithoutPassword | undefined> => {
  const dbConnection = await promisePool.getConnection();

  try {
    await dbConnection.beginTransaction();

    const possibleFields: (keyof User)[] = [
      'username',
      'password',
      'email',
      'role',
    ];
    const fields: string[] = [];
    const values: any[] = [];

    possibleFields.forEach((field) => {
      if (user[field] !== undefined) {
        fields.push(field);
        values.push(user[field]);
      }
    });

    if (fields.length === 0) {
      throw new CustomError('No fields to update', 400);
    }

    const query = `UPDATE users SET ${fields
      .map((field) => `${field} = ?`)
      .join(', ')} WHERE id = ?`;

    const params = [...values, userId];

    const [result] = await dbConnection.execute<ResultSetHeader>(query, params);

    if (result.affectedRows === 0) {
      throw new CustomError('User not found', 404);
    }

    const updatedUser = await getUserById(userId);

    await dbConnection.commit();
    return updatedUser;
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      dbConnection.rollback();
      throw new CustomError('Username or email already exists', 400);
    }
  } finally {
    dbConnection.release();
  }
};

export {
  getUserByUsername,
  createUser,
  getAllUsers,
  getUserById,
  changeUserData,
};
