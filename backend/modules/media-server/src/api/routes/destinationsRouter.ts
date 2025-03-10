import {Router} from 'express';
import {validationErrorHandler} from '../middlewares/errorHandlers';
import {
  deleteDestinationById,
  getAllDestinations,
  getDestinatioById,
  postDestination,
} from '../controller/destinationController';
import userAuthenticator from '../middlewares/authentication';
import {body, param} from 'express-validator';

const router = Router();

router.get('/', (req, res) => {
  res.json({message: 'Check for /create, /all, /:id route'});
});

router.get('/all', getAllDestinations);
router.get(
  '/:id',
  param('id').isNumeric().withMessage('Id needs to be number'),
  validationErrorHandler,
  getDestinatioById,
);

router.post(
  '/create',
  userAuthenticator,
  body('name').isString().withMessage('Name needs to be string'),
  body('country').isString().withMessage('Country needs to be string'),
  body('description').isString().withMessage('Description needs to be string'),
  body('category_id').isNumeric().withMessage('Category needs to be number'),
  validationErrorHandler,
  postDestination,
);

router.delete(
  '/delete/:id',
  userAuthenticator,
  param('id').isNumeric().withMessage('Id needs to be number'),
  validationErrorHandler,
  deleteDestinationById,
);

// Implemented if needed
// router.put("/destinations/:id", updateDestination);

export default router;
