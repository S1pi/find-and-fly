import {Router} from 'express';
import {getUserByToken} from '../controllers/userController';
import userAuthenticator from '../middlewares/authentication';

const router = Router();

router.get('/', (req, res) => {
  res.json({message: 'Check for /login and /register routes'});
});

router.get('/getbytoken', userAuthenticator, getUserByToken);

export default router;
