import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import { authRouter, postRouter } from 'src/routes';

import { NODE_ENV } from 'src/config';
import { NODE_ENVS } from 'src/types';

/* -------------------------------------------------------------------------- */

export const app: Application = express();

/**
 *  Middlewares
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

NODE_ENV !== NODE_ENVS.TEST && app.use(morgan('short'));

/**
 *  Routes
 */

app.use('/api/v1/users', authRouter);
app.use('/api/v1/posts', postRouter);
