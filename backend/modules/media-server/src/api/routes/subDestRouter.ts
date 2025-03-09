import {Router} from 'express';
import {validationErrorHandler} from '../middlewares/errorHandlers';

const router = Router();

router.get('/', (req, res) => {
  res.json({message: 'Check for /someroute route'});
});

export default router;
