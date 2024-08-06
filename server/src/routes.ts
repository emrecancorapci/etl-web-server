import { Router } from 'express';

import { auth } from './middlewares/authentication.ts';
import { loginRouter } from './modules/login/routes.ts';
import { notificationRouter } from './modules/notification/routes.ts';
import { pairRouter } from './modules/pair/routes.ts';
import { subscriptionRouter } from './modules/subscription/routes.ts';

const router: Router = Router();

router.use('/notification', notificationRouter);
router.use('/subscription', auth, subscriptionRouter);
router.use('/pair', auth, pairRouter);
router.use('/login', loginRouter);

export { router };
