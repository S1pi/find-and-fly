import promisePool from 'shared/database/connection';
import CustomError from 'utils/CustomError';
import {Destination, DestinationCreate, FileData} from 'types/DataTypes';
import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {
  CreatedDestinationMessage,
  DeleteDestinationMessage,
} from 'types/MessageTypes';
import {addFileData} from './mediaModel';

const getDestinationList = async (): Promise<Destination[]> => {
  const query = 'SELECT * FROM destinations';

  const [rows] = await promisePool.execute<RowDataPacket[] & Destination[]>(
    query,
  );

  if (rows.length === 0) {
    throw new CustomError('No destinations found', 404);
  }

  return rows;
};

const getDestinationFromId = async (id: number): Promise<Destination> => {
  const query = 'SELECT * FROM destinations WHERE id = ?';

  const [rows] = await promisePool.execute<RowDataPacket[] & Destination[]>(
    query,
    [id],
  );

  if (rows.length === 0) {
    throw new CustomError('Destination not found', 404);
  }

  return rows[0];
};

const createDestination = async (
  destination: DestinationCreate,
): Promise<CreatedDestinationMessage> => {
  const query = `INSERT INTO destinations (user_id, name, country, description, category_id) VALUES (?, ?, ?, ?, ?)`;
  const options = [
    destination.user_id,
    destination.name,
    destination.country,
    destination.description,
    destination.category_id,
  ];

  const [result] = await promisePool.execute<ResultSetHeader>(query, options);

  if (!result.insertId) {
    throw new CustomError('Error creating destination', 500);
  }

  const newDestination = await getDestinationFromId(result.insertId);

  // Add destination file data
  const fileData = {
    user_id: destination.user_id,
    target_type: 'destination',
    target_id: result.insertId,
    file_name: destination.file_data?.file_name,
    file_url: destination.file_data?.file_url,
  };

  try {
    const fileResponse = await addFileData(fileData);

    console.log(fileResponse);
  } catch (err) {
    console.log('Error adding file data', err);
    throw new CustomError('Error adding file data', 500);
  }

  return {
    message: 'Destination created successfully',
    subDestination_id: result.insertId,
    destination: newDestination,
  };
};

const deleteDestination = async (
  id: number,
): Promise<DeleteDestinationMessage> => {
  const query = 'DELETE FROM destinations WHERE id = ?';
  const dbConnection = await promisePool.getConnection();

  try {
    dbConnection.beginTransaction();

    const [result] = await promisePool.execute<ResultSetHeader>(query, [id]);

    if (result.affectedRows === 0) {
      throw new CustomError('Destination not found', 404);
    }

    dbConnection.commit();
    return {message: 'Destination deleted succesfully', destination_id: id};
  } finally {
    dbConnection.release();
  }
};

export {
  getDestinationList,
  getDestinationFromId,
  createDestination,
  deleteDestination,
};
