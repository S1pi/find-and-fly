import {Router} from 'express';
import {
  fetchAllUsers,
  fetchUserById,
  getUserByToken,
  putUserData,
} from '../controllers/userController';
import userAuthenticator from '../middlewares/authentication';
import {body, param} from 'express-validator';
import {validationErrorHandler} from '../middlewares/errorHandlers';

const router = Router();

router.get('/', (req, res) => {
  res.json({message: 'Check for /getbytoken route'});
});

// Change route to something else
router.get('/getbytoken', userAuthenticator, getUserByToken);

router.get('/getAll', userAuthenticator, fetchAllUsers);

router
  .route('/:id')
  .get(param('id').isNumeric(), validationErrorHandler, fetchUserById);

router.put(
  '/update',
  body('username')
    .optional()
    .isString()
    .trim()
    .escape()
    .isLength({min: 3, max: 20})
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]*$/)
    .withMessage(
      'Username must contain only letters, numbers, and underscores',
    ),
  body('email')
    .optional()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email'),
  body('password')
    .optional()
    .isString()
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters'),
  validationErrorHandler,
  userAuthenticator,
  putUserData,
);
export default router;
