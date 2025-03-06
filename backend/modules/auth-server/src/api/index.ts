import express, {Request, Response} from 'express';
import {MessageResponse} from 'types/MessageTypes';

const router = express.Router();

router.get('/', (req: Request, res: Response<MessageResponse>) => {
  res.json({message: 'routes: users, auth'});
});

// router.use('/auth', authRouter);
// router.use('/users', userRouter);

export default router;
