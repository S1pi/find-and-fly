import {Router} from 'express';
import {fetchAllUsers, getUserByToken} from '../controllers/userController';
import userAuthenticator from '../middlewares/authentication';

const router = Router();

router.get('/', (req, res) => {
  res.json({message: 'Check for /getbytoken route'});
});

// Change route to something else
router.get('/getbytoken', userAuthenticator, getUserByToken);

router.get('/getAll', userAuthenticator, fetchAllUsers);

export default router;
