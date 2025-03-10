import express, {Request, Response} from 'express';
import {MessageResponse} from 'types/MessageTypes';
import fileRouter from './routes/fileRouter';

const router = express.Router();

router.get('/', (req: Request, res: Response<MessageResponse>) => {
  res.json({message: 'routes: /files'});
});

router.use('/files', fileRouter);

export default router;
