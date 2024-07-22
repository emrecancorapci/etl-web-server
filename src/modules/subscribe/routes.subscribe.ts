import { Router } from 'express';

import { post } from './controller.subscribe.ts';

const router = Router();

router.post('/', post);

export { router };
