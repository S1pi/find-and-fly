import {ResultSetHeader, RowDataPacket} from 'mysql2';
import promisePool from 'shared/database/connection';
import {Review, ReviewCreate} from 'types/DataTypes';
import {CreatedReviewMessage} from 'types/MessageTypes';
import CustomError from 'utils/CustomError';
import {getDestinationFromId} from './destinationsModel';

const getAllReviewsDb = async () => {
  const query = `
              SELECT 
                r.id,
                r.user_id,
                r.destination_id,
                r.rating,
                r.trip_type,
                r.comment,
                COUNT(CASE WHEN rr.reaction = 'like' THEN 1 END) as likes,
                COUNT(CASE WHEN rr.reaction = 'dislike' THEN 1 END) as dislikes,
                r.created_at
              FROM reviews r
              LEFT JOIN review_actions rr ON r.id = rr.review_id
              GROUP BY r.id
              `;

  const [rows] = await promisePool.execute<RowDataPacket[] & Review[]>(query);

  if (rows.length === 0) {
    throw new CustomError('No reviews found', 404);
  }

  return rows;
};

const getOneReviewById = async (id: number): Promise<Review> => {
  const query = `
              SELECT 
                r.id,
                r.user_id,
                r.destination_id,
                r.rating,
                r.trip_type,
                r.comment,
                COUNT(CASE WHEN rr.reaction = 'like' THEN 1 END) as likes,
                COUNT(CASE WHEN rr.reaction = 'dislike' THEN 1 END) as dislikes,
                r.created_at
              FROM reviews r
              LEFT JOIN review_actions rr ON r.id = rr.review_id
              WHERE r.id = ?
              GROUP BY r.id
              `;

  const [rows] = await promisePool.execute<RowDataPacket[] & Review[]>(query, [
    id,
  ]);

  if (rows.length === 0) {
    throw new CustomError('Review not found', 404);
  }

  return rows[0];
};

const createReview = async (
  review: ReviewCreate,
): Promise<CreatedReviewMessage> => {
  const query = `INSERT INTO reviews (user_id, destination_id, rating, trip_type, comment)
                 VALUES (?, ?, ?, ?, ?)
                `;

  const options = [
    review.user_id,
    review.destination_id,
    review.rating,
    review.trip_type,
    review.comment,
  ];

  await getDestinationFromId(review.destination_id);

  const [rows] = await promisePool.execute<ResultSetHeader>(query, options);

  if (!rows.insertId) {
    throw new CustomError('Error creating review', 500);
  }

  const newReview = await getOneReviewById(rows.insertId);

  return {
    message: 'Review created successfully',
    review_id: rows.insertId,
    review: newReview,
  };
};

export {getAllReviewsDb, getOneReviewById, createReview};
