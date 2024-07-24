import { Router } from 'express';

import { w } from '@/helpers/wrapper.ts';

import { post } from './controller.ts';

const subscriptionRouter: Router = Router();

subscriptionRouter.post('/', w(post));

export { subscriptionRouter };
