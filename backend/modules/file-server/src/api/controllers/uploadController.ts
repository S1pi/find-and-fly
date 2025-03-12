import {Request, Response, NextFunction} from 'express';
import CustomError from 'utils/CustomError';

import fs from 'fs';
import {MessageResponse} from 'types/MessageTypes';

// Ilen versio
// type UploadResponse = MessageResponse & {
//   data: {
//     filename: string;
//     media_type: string;
//     filesize: number;
//     screenshots?: string[];
//   };
// };

// Mun versio oman tietokannan mukaisesti (varmista miten toimii)
type UploadResponse = MessageResponse & {
  file_name: string;
  target_type: string;
  target_id: number;
  file_url: string;
};

const uploadFile = (
  req: Request,
  res: Response<UploadResponse>,
  next: NextFunction,
) => {
  const tempFiles: string[] = [];

  try {
    if (!req.file) {
      throw new CustomError('File not valid', 400);
    }

    const extension = req.file.originalname.split('.').pop();
    if (!extension) {
      throw new CustomError('Invalid file extension', 400);
    }

    // Kato miten tää pitää toteuttaa verrattuna ilen versioon
    const response: UploadResponse = {
      message: 'File uploaded',
      file_name: req.file.filename,
      target_type: 'user',
      target_id: req.user?.id || 0,
      file_url: `http://localhost:3003/uploads/${req.file.filename}`,
    };

    res.status(201).json(response);
  } catch (err) {
    // cleanup(tempFiles); // Ilellä oli tää, mutta en tiedä mitä se tekee
    next(
      err instanceof CustomError
        ? err
        : new CustomError((err as Error).message, 400),
    );
  }
};

export default uploadFile;
