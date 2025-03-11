import express, {Request, Response, NextFunction} from 'express';
import multer from 'multer';
import userAuthenticator from '../middlewares/authentication';
import CustomError from 'utils/CustomError';
import uploadFile from '../controllers/uploadController';

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const userId = req.user?.username;
    const fileExtension = file.originalname.split('.').pop();
    const createFilename = `${userId}-${Date.now()}.${fileExtension}`;
    cb(null, createFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: {fileSize: 1024 * 1024 * 5},
}).single('file');

const makeUpload = (
  req: Request,
  res: Response,
  // res: Response<unknown, {user: TokenData}>, // Check if this is needed or not
  next: NextFunction,
) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      next(new CustomError(err.message, 400));
      return;
    }

    if (req.file && req.file.mimetype.includes('image')) {
      console.log('Ollaan ttällä');
      return next();
    }

    return next(new CustomError('Invalid file type', 400));
  });
};

// Need still controller
router.post('/upload', userAuthenticator, makeUpload, uploadFile);
router.delete('/delete/:filename');

export default router;
