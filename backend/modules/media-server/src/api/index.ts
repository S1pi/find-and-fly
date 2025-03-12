import express, {Request, Response} from 'express';
import {MessageResponse} from 'types/MessageTypes';
import reviewsRouter from './routes/reviewsRouter';
import subDestRouter from './routes/subDestRouter';
import destinationsRouter from './routes/destinationsRouter';

const router = express.Router();

router.get('/', (req: Request, res: Response<MessageResponse>) => {
  res.json({message: 'routes: /reviews, /subdest, /destinations, /media'});
});

router.use('/reviews', reviewsRouter);
router.use('/subdest', subDestRouter);
router.use('/destinations', destinationsRouter);

export default router;
