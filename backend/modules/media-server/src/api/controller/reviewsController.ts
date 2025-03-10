import {Request, Response, NextFunction} from 'express';
import CustomError from 'utils/CustomError';
import {
  addReviewReaction,
  createReview,
  deleteReview,
  getAllReviewsDb,
  getOneReviewById,
  getReviewActionData,
  updateReviewReaction,
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

const deleteReviewById = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviewId = req.params.id;

    const user = req.user;

    if (!user) {
      throw new CustomError('User not authenticated', 401);
    }

    const review = await getOneReviewById(Number(reviewId));

    if (user.id !== review.user_id && user.role !== 'admin') {
      throw new CustomError('Unauthorized', 403);
    }

    const deleteResponse = await deleteReview(Number(reviewId));

    res.status(200).json(deleteResponse);
  } catch (err) {
    next(err);
  }
};

const postReviewLike = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction,
) => {
  await handleReviewReaction(req, res, next, 'like');
};

const postReviewDislike = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction,
) => {
  await handleReviewReaction(req, res, next, 'dislike');
};

const handleReviewReaction = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction,
  reaction: 'like' | 'dislike',
) => {
  try {
    const reviewId = req.params.id;
    const user = req.user;

    if (!user) {
      throw new CustomError('User not authenticated', 401);
    }

    const review = await getOneReviewById(Number(reviewId));

    if (user.id === review.user_id) {
      throw new CustomError('User cannot like or dislike own review', 403);
    }

    const reviewActions = await getReviewActionData(Number(reviewId));

    const userReaction = reviewActions.find(
      (action) => action.user_id === user.id,
    );

    console.log(userReaction);

    if (userReaction) {
      if (userReaction.reaction === reaction) {
        throw new CustomError('User has already reacted', 403);
      }

      const updateReviewReactionResponse = await updateReviewReaction(
        userReaction.user_id,
        userReaction.id,
        reaction,
      );

      res.status(200).json(updateReviewReactionResponse);
    } else {
      const addReviewReactionResponse = await addReviewReaction(
        user.id,
        Number(reviewId),
        reaction,
      );

      res.status(201).json(addReviewReactionResponse);
    }
  } catch (err) {
    next(err);
  }
};

export {
  getAllReviews,
  getReviewById,
  postReview,
  deleteReviewById,
  postReviewLike,
  postReviewDislike,
};
