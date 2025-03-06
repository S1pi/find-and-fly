import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import api from './api'; // Imports /api/index.ts
import {
  errorHandler,
  notFoundErrorHandler,
} from './api/middlewares/errorHandlers';

// Load environment variables
// dotenv.config();

// Should we use morgan? Find out more at https://www.npmjs.com/package/morgan
// app.use(morgan('dev'));

// Should we use helmet? Find out more at https://www.npmjs.com/package/helmet

const app = express();

app.use(cors());
app.use(express.json());

// public folder for api documentation
app.use(express.static('public'));

app.use('/api', api);

app.use(notFoundErrorHandler);
app.use(errorHandler);

export default app;
