import { Router } from 'express';

import { w } from '@/helpers/wrapper.ts';

import { post } from './controller.subscribe.ts';

const subscribeRouter: Router = Router();

subscribeRouter.post('/', w(post));

export { subscribeRouter };
