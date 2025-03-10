import {Request, Response, NextFunction} from 'express';
import {
  createSubDestination,
  deleteSubDestination,
  getSubDestinationById,
  getSubDestinationList,
} from '../model/subDestModel';
import {SubDestinationCreate} from 'types/DataTypes';
import CustomError from 'utils/CustomError';
import {CreatedDestinationMessage} from 'types/MessageTypes';

const getAllSubDestinations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const subDestinations = await getSubDestinationList();

    res.status(200).json(subDestinations);
  } catch (err) {
    next(err);
  }
};

const getSubDestById = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const subDestId = req.params.id;

    const subDest = await getSubDestinationById(Number(subDestId));

    res.status(200).json(subDest);
  } catch (err) {
    next(err);
  }
};

const postSubDestination = async (
  req: Request<{}, {}, SubDestinationCreate>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;

    if (!user) {
      throw new CustomError('User not authenticated', 401);
    }

    const newSubDestination = req.body;
    newSubDestination.user_id = user.id;

    const createdSubDestination = await createSubDestination(newSubDestination);

    res.status(201).json(createdSubDestination);
  } catch (err) {
    next(err);
  }
};

const deleteSubDestinationById = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const subDestId = req.params.id;

    const user = req.user;

    if (!user) {
      throw new CustomError('User not authenticated', 401);
    }

    if (user.role !== 'admin') {
      throw new CustomError('Only admin can delete subDestinations', 403);
    }

    const deletedSubDest = await deleteSubDestination(Number(subDestId));

    res.status(200).json(deletedSubDest);
  } catch (err) {
    next(err);
  }
};

export {
  getAllSubDestinations,
  getSubDestById,
  postSubDestination,
  deleteSubDestinationById,
};
