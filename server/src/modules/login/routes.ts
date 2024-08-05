import { Router } from 'express';

import { w } from '@/helpers/wrapper.ts';

import { login } from './controller.ts';

const loginRouter: Router = Router();

loginRouter.post('/', w(login));

export { loginRouter };
