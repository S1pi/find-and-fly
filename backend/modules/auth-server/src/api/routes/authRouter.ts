import express from 'express';
import {body} from 'express-validator';

const router = express.Router();

router.post(
  '/login',
  body('username')
    .escape()
    .trim()
    .isString()
    .isLength({min: 3, max: 18})
    .withMessage('Username must be between 3 and 18 characters'),
  body('password')
    .isString()
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters'),
  // loginUser,
);

router.post(
  '/register',
  body('username')
    .trim()
    .escape()
    .isString()
    .isLength({min: 3, max: 18})
    .withMessage('Username must be between 3 and 18 characters')
    .matches(/^[a-zA-Z0-9_]*$/)
    .withMessage(
      'Username must contain only letters, numbers, and underscores',
    ),
  body('password')
    .isString()
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters'),
  body('email').trim().isEmail().withMessage('Invalid email').normalizeEmail(),
  // registerUser,
);
