import { Router } from 'express';

import { w } from '@/helpers/wrapper.ts';

import { del, get, getAll, post } from './controller.ts';

const subscriptionRouter: Router = Router();

subscriptionRouter.get('/', w(getAll));
subscriptionRouter.get('/:id', w(get));
subscriptionRouter.post('/', w(post));
subscriptionRouter.delete('/:id', w(del));

export { subscriptionRouter };
