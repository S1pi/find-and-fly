import {NextFunction, Request, Response} from 'express';
import CustomError from 'utils/CustomError';
import {
  createDestination,
  deleteDestination,
  getDestinationFromId,
  getDestinationList,
} from '../model/destinationsModel';
import {Destination, DestinationCreate} from 'types/DataTypes';
import {CreatedDestinationMessage} from 'types/MessageTypes';

const getAllDestinations = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const destinationList = await getDestinationList();

    res.status(200).json(destinationList);
  } catch (err) {
    next(err);
  }
};

const getDestinatioById = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const destinationId = req.params.id;

    const destination = await getDestinationFromId(Number(destinationId));

    res.status(200).json(destination);
  } catch (err) {
    next(err);
  }
};

const postDestination = async (
  req: Request<{}, {}, DestinationCreate>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new CustomError('User not authenticated', 401);
    }

    const newDestination = req.body;
    newDestination.user_id = req.user.id;

    const createdDestinationMessage: CreatedDestinationMessage =
      await createDestination(newDestination);

    res.status(201).json(createdDestinationMessage);
  } catch (err) {
    next(err);
  }
};

const deleteDestinationById = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const destinationId = req.params.id;

    const user = req.user;

    if (!user) {
      throw new CustomError('User not authorized', 401);
    }

    if (user.role !== 'admin') {
      throw new CustomError('Only admin can delete destinations', 403);
    }

    const deletedDestination = await deleteDestination(Number(destinationId));

    res.status(200).json(deletedDestination);
  } catch (err) {
    next(err);
  }
};

export {
  getAllDestinations,
  getDestinatioById,
  postDestination,
  deleteDestinationById,
};
