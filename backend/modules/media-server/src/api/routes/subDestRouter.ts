import {Router} from 'express';
import {validationErrorHandler} from '../middlewares/errorHandlers';
import userAuthenticator from '../middlewares/authentication';
import {body, param} from 'express-validator';
import {
  deleteSubDestinationById,
  getAllSubDestinations,
  getSubDestById,
  postSubDestination,
} from '../controller/subDestController';

const router = Router();

router.get('/', (req, res) => {
  res.json({message: 'Check for /all, /:id route'});
});

router.get('/all', getAllSubDestinations);
router.get(
  '/:id',
  param('id').isNumeric().withMessage('Id needs to be number'),
  validationErrorHandler,
  getSubDestById,
);

router.post(
  '/create',
  userAuthenticator,
  body('name')
    .isString()
    .withMessage('Name needs to be string or it is missing'),
  body('description')
    .isString()
    .withMessage('Description needs to be string or it is missing'),
  body('destination_id')
    .isNumeric()
    .withMessage('Destination needs to be number or it is missing'),
  body('rating')
    .isNumeric()
    .withMessage('Rating needs to be number or it is missing'),
  validationErrorHandler,
  postSubDestination,
);

router.delete(
  '/delete/:id',
  userAuthenticator,
  param('id').isNumeric().withMessage('Id needs to be number'),
  validationErrorHandler,
  deleteSubDestinationById,
);

export default router;
