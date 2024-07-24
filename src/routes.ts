import { Router } from 'express';

import { notifyRouter } from './modules/notify/routes.notify';
import { subscribeRouter } from './modules/subscribe/routes.subscribe';

const router = Router();

router.use('/notify', notifyRouter);
router.use('/subscribe', subscribeRouter);

export { router };
