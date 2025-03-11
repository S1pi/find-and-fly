import {ResultSetHeader, RowDataPacket} from 'mysql2';
import promisePool from 'shared/database/connection';
import CustomError from 'utils/CustomError';

const addFileData = async (fileData: any) => {
  const query = `INSERT INTO files (user_id, target_type, target_id, file_name, file_url) 
  VALUES (?, ?, ?, ?, ?)`;

  const options = [
    fileData.user_id,
    fileData.target_type,
    fileData.target_id,
    fileData.file_name,
    fileData.file_url,
  ];

  const [result] = await promisePool.execute<ResultSetHeader>(query, options);

  if (result.affectedRows === 0) {
    throw new CustomError('File data not added', 500);
  }

  return {message: 'File data added successfully', file_id: result.insertId};
};

export {addFileData};
