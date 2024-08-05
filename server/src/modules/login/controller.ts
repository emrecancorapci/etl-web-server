import argon2 from 'argon2';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { BadRequestError, InternalServerError } from '@/middlewares/error/base.ts';

export async function login(req: Request, res: Response) {
  const { NODE_PASS, NODE_HASH, NODE_SECRET } = process.env;

  if (!NODE_PASS || !NODE_HASH || !NODE_SECRET) {
    throw new InternalServerError('Internal Server Error');
  }

  const { pass } = req.body;

  if (!pass || typeof pass !== 'string') {
    throw new BadRequestError('Password is required.');
  }

  if (!(pass === NODE_PASS)) {
    throw new BadRequestError('Wrong password.');
  }

  const hashed = await argon2.hash(NODE_HASH);

  const token = jwt.sign(hashed, NODE_SECRET);

  res.status(200).send({ token });
}
