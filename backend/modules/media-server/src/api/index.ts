import express, {Request, Response} from 'express';
import {MessageResponse} from 'types/MessageTypes';

const router = express.Router();

router.get('/', (req: Request, res: Response<MessageResponse>) => {
  res.json({message: 'routes: media'});
});

// router.use('/somethingaboutapp', mediaRouter);

export default router;
