import {Router} from 'express';
import {
  deleteReviewById,
  getAllReviews,
  getReviewById,
  getReviewsByDestId,
  postReview,
  postReviewDislike,
  postReviewLike,
} from '../controller/reviewsController';
import {validationErrorHandler} from '../middlewares/errorHandlers';
import {body, param} from 'express-validator';
import userAuthenticator from '../middlewares/authentication';

const router = Router();

const tripTypes = ['solo', 'family', 'friends', 'couple', 'business', 'other'];

router.get('/', (req, res) => {
  res.json({message: 'Check for /getall route'});
});

router.get('/getall', getAllReviews);
router.get(
  '/getall/byid/:id',
  param('id').isNumeric().withMessage('Destination id must be a number'),
  validationErrorHandler,
  getReviewsByDestId,
);

router.get(
  '/:id',
  param('id').isNumeric().withMessage('Review id must be a number'),
  validationErrorHandler,
  getReviewById,
);

router.post(
  '/create',
  userAuthenticator,
  body('destination_id')
    .isNumeric()
    .withMessage('Destination id must be a number and is required'),
  body('rating')
    .isNumeric()
    .withMessage(
      'Rating must be a number between 1 and 5 inclusive and is required',
    ),
  body('trip_type')
    .isString()
    .withMessage('Trip type must be a string and is required')
    .isIn(tripTypes)
    .withMessage(
      'Trip type must be one of the following: solo, family, friends, couple, business, other',
    ),
  body('comment')
    .isString()
    .withMessage('Comment must be a string and is required'),
  validationErrorHandler,
  postReview,
);

router.delete(
  '/:id',
  userAuthenticator,
  param('id').isNumeric().withMessage('Review id must be a number'),
  validationErrorHandler,
  deleteReviewById,
);

router.post(
  '/:id/like',
  userAuthenticator,
  param('id').isNumeric().withMessage('Review id must be a number'),
  validationErrorHandler,
  postReviewLike,
);

router.post(
  '/:id/dislike',
  userAuthenticator,
  param('id').isNumeric().withMessage('Review id must be a number'),
  validationErrorHandler,
  postReviewDislike,
);

export default router;
