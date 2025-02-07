import './bootstrap';
import './database';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('express-async-errors');
import express from 'express';
import path from 'path';
import cors from 'cors';

import cookieParser from 'cookie-parser';

import { errorMiddleware } from './middlewares/errorMiddleware';
import routes from './routes';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(routes);

app.use(errorMiddleware);

export default app;
