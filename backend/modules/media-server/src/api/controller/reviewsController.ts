import {Request, Response, NextFunction} from 'express';
import CustomError from 'utils/CustomError';
import {
  createReview,
  getAllReviewsDb,
  getOneReviewById,
} from '../model/reviewsModel';
import {ReviewCreate} from 'types/DataTypes';

const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviews = await getAllReviewsDb();

    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

const getReviewById = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviewId = req.params.id;

    const review = await getOneReviewById(Number(reviewId));

    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
};

const postReview = async (
  req: Request<{}, {}, Omit<ReviewCreate, 'user_id'>>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const review = req.body;

    const user = req.user;

    if (!user) {
      throw new CustomError('User not authenticated', 401);
    }

    const reviewWithUserId = {user_id: user.id, ...review};

    const newReview = await createReview(reviewWithUserId);

    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
};

export {getAllReviews, getReviewById, postReview};
