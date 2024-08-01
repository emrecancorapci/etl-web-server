import { Router } from 'express';

import { w } from '@/helpers/wrapper.ts';

import { deleteBySourceId, deleteByTargetId, getAll, getSource, getTarget, patch, post } from './controller.ts';

const pairRouter: Router = Router();

pairRouter.get('/', w(getAll));
pairRouter.get('/:id', w(getTarget));
pairRouter.get('/source/:id', w(getSource));
pairRouter.post('/', w(post));
pairRouter.patch('/', w(patch));
pairRouter.delete('/:id', w(deleteByTargetId));
pairRouter.delete('/source/:id', w(deleteBySourceId));

export { pairRouter };
