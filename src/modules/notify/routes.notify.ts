import { Router } from 'express';

import { post } from './controller.notify.ts';

const router = Router();

router.post('/', post);

export { router };
