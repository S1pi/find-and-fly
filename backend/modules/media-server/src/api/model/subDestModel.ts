import {ResultSetHeader, RowDataPacket} from 'mysql2';
import promisePool from 'shared/database/connection';
import {SubDestination, SubDestinationCreate} from 'types/DataTypes';
import {
  CreatedDestinationMessage,
  DeleteDestinationMessage,
} from 'types/MessageTypes';
import CustomError from 'utils/CustomError';

const getSubDestinationList = async (): Promise<SubDestination[]> => {
  const query = `SELECT * FROM sub_destinations`;

  const [rows] = await promisePool.execute<RowDataPacket[] & SubDestination[]>(
    query,
  );

  return rows;
};

const getSubDestinationsByDestinationId = async (
  id: number,
): Promise<SubDestination[]> => {
  const query = `SELECT * FROM sub_destinations WHERE destination_id = ?`;

  const [rows] = await promisePool.execute<RowDataPacket[] & SubDestination[]>(
    query,
    [id],
  );

  return rows;
};

const getSubDestinationById = async (id: number): Promise<SubDestination> => {
  const query = `SELECT * FROM sub_destinations WHERE id = ?`;

  const [rows] = await promisePool.execute<RowDataPacket[] & SubDestination[]>(
    query,
    [id],
  );

  if (rows.length === 0) {
    throw new CustomError('SubDestination not found', 404);
  }

  return rows[0];
};

const createSubDestination = async (
  subDestination: SubDestinationCreate,
): Promise<CreatedDestinationMessage> => {
  const query = `INSERT INTO sub_destinations (name, description, destination_id, rating, user_id) VALUES (?, ?, ?, ?, ?)`;
  const options = [
    subDestination.name,
    subDestination.description,
    subDestination.destination_id,
    subDestination.rating,
    subDestination.user_id,
  ];

  const [result] = await promisePool.execute<ResultSetHeader>(query, options);

  if (!result.insertId) {
    throw new CustomError('Error creating subDestination', 500);
  }

  const subDestinationCreated = await getSubDestinationById(result.insertId);

  return {
    message: 'SubDestination created successfully',
    subDestination_id: subDestinationCreated.id,
    destination: subDestinationCreated,
  };
};

const deleteSubDestination = async (
  id: number,
): Promise<DeleteDestinationMessage> => {
  const query = `DELETE FROM sub_destinations WHERE id = ?`;
  const dbConnection = await promisePool.getConnection();

  try {
    await dbConnection.beginTransaction();

    const [result] = await promisePool.execute<ResultSetHeader>(query, [id]);

    if (result.affectedRows === 0) {
      throw new CustomError('SubDestination not found', 404);
    }

    await dbConnection.commit();

    return {
      message: 'SubDestination deleted successfully',
      destination_id: id,
    };
  } finally {
    dbConnection.release();
  }
};

export {
  getSubDestinationList,
  getSubDestinationById,
  getSubDestinationsByDestinationId,
  createSubDestination,
  deleteSubDestination,
};
