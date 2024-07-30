import { Router } from 'express';

import { w } from '@/helpers/wrapper.ts';

import { post } from './controller.ts';

const notificationRouter: Router = Router();

notificationRouter.post('/', w(post));

export { notificationRouter };
