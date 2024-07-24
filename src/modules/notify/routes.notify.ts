import { Router } from 'express';

import { w } from '@/helpers/wrapper.ts';

import { post } from './controller.notify.ts';

const notifyRouter: Router = Router();

notifyRouter.post('/', w(post));

export { notifyRouter };
