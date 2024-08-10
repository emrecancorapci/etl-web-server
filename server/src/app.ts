import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { type Application } from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';

import errorHandler from './middlewares/error/error-handler.ts';
import notFound from './middlewares/not-found.ts';
import { router } from './routes.ts';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'dev';


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app: Application = express();

app.disable('x-powered-by');
app.disable('etag');
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1kb' }));
app.use(morgan(NODE_ENV));

app.use('/api', router);
app.use('/api', notFound);

app.use(express.static('public'));

app.use(errorHandler);

export default app;
