import promisePool from 'shared/database/connection';
import CustomError from 'utils/CustomError';
import {Destination, DestinationCreate} from 'types/DataTypes';
import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {
  CreatedDestinationMessage,
  DeleteDestinationMessage,
} from 'types/MessageTypes';

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

  return {
    message: 'Destination created successfully',
    destination_id: result.insertId,
    destination: newDestination,
  };
};

const deleteDestination = async (
  id: number,
): Promise<DeleteDestinationMessage> => {
  const query = 'DELETE FROM destinations WHERE id = ?';

  const [result] = await promisePool.execute<ResultSetHeader>(query, [id]);

  if (result.affectedRows === 0) {
    throw new CustomError('Error deleting destination', 500);
  }

  return {message: 'Destination deleted succesfully', destination_id: id};
};

export {
  getDestinationList,
  getDestinationFromId,
  createDestination,
  deleteDestination,
};
