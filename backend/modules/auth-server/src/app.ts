import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import api from './api'; // Imports /api/index.ts
import {
  errorHandler,
  notFoundErrorHandler,
} from './api/middlewares/errorHandlers';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// public folder for api documentation
app.use(express.static('public'));

app.use('/api', api);

app.use(notFoundErrorHandler);
app.use(errorHandler);

export default app;
