import { Router } from 'express';

import { notificationRouter } from './modules/notification/routes.ts';
import { pairRouter } from './modules/pair/routes.ts';
import { subscriptionRouter } from './modules/subscription/routes.ts';

const router: Router = Router();

router.use('/notification', notificationRouter);
router.use('/subscription', subscriptionRouter);
router.use('/pair', pairRouter);

export { router };
