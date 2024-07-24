import { Router } from 'express';

import { w } from '@/helpers/wrapper.ts';

import { post } from './controller.notify.ts';

const router = Router();

router.post('/', w(post));

export { router };
