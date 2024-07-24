import { Router } from 'express';

import { notifyRouter } from './modules/notify/routes-notify.ts';
import { subscribeRouter } from './modules/subscribe/routes-subscribe.ts';

const router: Router = Router();

router.use('/notify', notifyRouter);
router.use('/subscribe', subscribeRouter);

export { router };
