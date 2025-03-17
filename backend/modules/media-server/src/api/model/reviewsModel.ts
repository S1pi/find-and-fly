import {ResultSetHeader, RowDataPacket} from 'mysql2';
import promisePool from 'shared/database/connection';
import {Review, ReviewAction, ReviewCreate} from 'types/DataTypes';
import {CreatedReviewMessage, DeleteReviewMessage} from 'types/MessageTypes';
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

const getReviewsByDestinationId = async (id: number): Promise<Review[]> => {
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
                r.created_at,
                u.username,
                f.file_url AS profile_picture
              FROM reviews r
              LEFT JOIN review_actions rr ON r.id = rr.review_id
              INNER JOIN users u ON r.user_id = u.id
              LEFT JOIN files f ON f.target_type = 'user' AND f.target_id = u.id
              WHERE r.destination_id = ?
              GROUP BY r.id, u.username, f.file_url
              `;

  const [rows] = await promisePool.execute<RowDataPacket[] & Review[]>(query, [
    id,
  ]);

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

const deleteReview = async (id: number): Promise<DeleteReviewMessage> => {
  const query = `DELETE FROM reviews WHERE id = ?`;
  const dbConnection = await promisePool.getConnection();
  try {
    dbConnection.beginTransaction();

    const [rows] = await promisePool.execute<ResultSetHeader>(query, [id]);

    console.log(rows);

    if (rows.affectedRows === 0) {
      throw new CustomError('Review not found', 404);
    }

    dbConnection.commit();
    return {message: 'Review deleted successfully', review_id: id};
  } finally {
    dbConnection.release();
  }
};

const getReviewActionData = async (id: number): Promise<ReviewAction[]> => {
  const query = `SELECT * FROM review_actions WHERE review_id = ?`;

  const [rows] = await promisePool.execute<RowDataPacket[] & ReviewAction[]>(
    query,
    [id],
  );

  console.log('Review like data', rows);

  return rows;
};

const updateReviewReaction = async (
  userId: number,
  reviewId: number,
  reaction: string,
) => {
  const dbConnection = await promisePool.getConnection();
  try {
    const query = `UPDATE review_actions SET reaction = ? WHERE id = ? AND user_id = ?`;
    const options = [reaction, reviewId, userId];

    await promisePool.execute(query, options);

    dbConnection.commit();
    return {message: 'Review reaction updated', reaction: reaction};
  } finally {
    dbConnection.release();
  }
};

const addReviewReaction = async (
  userId: number,
  reviewId: number,
  reaction: string,
) => {
  const dbConnection = await promisePool.getConnection();
  try {
    const query = `INSERT INTO review_actions (user_id, review_id, reaction) VALUES (?, ?, ?)`;
    const options = [userId, reviewId, reaction];

    await promisePool.execute(query, options);

    dbConnection.commit();
    return {message: 'Review reaction added', reaction: reaction};
  } finally {
    dbConnection.release();
  }
};

export {
  getAllReviewsDb,
  getReviewsByDestinationId,
  getOneReviewById,
  createReview,
  deleteReview,
  getReviewActionData,
  addReviewReaction,
  updateReviewReaction,
};
