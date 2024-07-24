import { Router } from 'express';

import { w } from '@/helpers/wrapper.ts';

import { post } from './controller.subscribe.ts';

const router = Router();

router.post('/', w(post));

export { router };
