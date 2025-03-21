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
// app.use(helmet({contentSecurityPolicy: false}));
app.use(
  helmet({
    crossOriginResourcePolicy: {policy: 'cross-origin'},
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-eval'"],
      },
    },
  }),
);

app.use(cors({origin: '*'}));
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use(express.static('public'));

app.use('/api', api);

app.use(notFoundErrorHandler);
app.use(errorHandler);

export default app;
