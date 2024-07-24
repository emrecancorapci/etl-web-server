import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { type Application } from 'express';
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';

import errorHandler from './middlewares/error/error-handler.ts';
import notFound from './middlewares/not-found.ts';
import { router } from './routes.ts';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'dev';

const RATE_LIMITER_CONFIG = {
  max: 100, // Limits each IP to 100 request per windowMs
  windowMs: 15 * 60 * 1000, // 15 minutes
};

const app: Application = express();

app.disable('x-powered-by');
app.use(rateLimiter(RATE_LIMITER_CONFIG));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1kb' }));
app.use(morgan(NODE_ENV));

app.use('/api', router);

app.use(notFound);
app.use(errorHandler);

export default app;
