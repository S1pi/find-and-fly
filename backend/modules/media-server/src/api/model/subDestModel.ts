import {ResultSetHeader, RowDataPacket} from 'mysql2';
import promisePool from 'shared/database/connection';
import {
  SubDestination,
  SubDestinationCreate,
  SubDestinationWithFileData,
} from 'types/DataTypes';
import {
  CreatedDestinationMessage,
  DeleteDestinationMessage,
} from 'types/MessageTypes';
import CustomError from 'utils/CustomError';
import {addFileData} from './mediaModel';

const getSubDestinationList = async (): Promise<SubDestination[]> => {
  const query = `SELECT * FROM sub_destinations`;

  const [rows] = await promisePool.execute<RowDataPacket[] & SubDestination[]>(
    query,
  );

  return rows;
};

const getSubDestinationsByDestinationId = async (
  id: number,
): Promise<SubDestinationWithFileData[]> => {
  // const query = `SELECT * FROM sub_destinations WHERE destination_id = ?`;
  const query = `SELECT 
  sd.id,
  sd.name,
  sd.description,
  sd.destination_id,
  sd.rating,
  sd.user_id,
  sd.created_at,
  f.file_name,
  f.file_url
FROM sub_destinations sd
LEFT JOIN files f ON sd.id = f.target_id AND f.target_type = 'sub_destination'
WHERE sd.destination_id = ?
GROUP BY sd.id, f.file_name, f.file_url;`;

  const [rows] = await promisePool.execute<
    RowDataPacket[] & SubDestinationWithFileData[]
  >(query, [id]);

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

  const fileData = {
    user_id: subDestination.user_id,
    target_type: 'sub_destination',
    target_id: result.insertId,
    file_name: subDestination.file_data?.file_name,
    file_url: subDestination.file_data?.file_url,
  };

  try {
    const fileResponse = await addFileData(fileData);

    console.log('fileResponse: ', fileResponse);
  } catch (err) {
    console.log('Error adding file data: ', err);
    throw new CustomError('Error adding file data', 500);
  }

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
