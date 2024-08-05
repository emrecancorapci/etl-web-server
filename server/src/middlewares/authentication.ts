import argon2 from 'argon2';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { InternalServerError, UnauthorizedError } from './error/base.ts';

export async function auth(req: Request, _: Response, next: NextFunction) {
  try {
    const { NODE_SECRET, NODE_HASH } = process.env;

    if (!NODE_SECRET || !NODE_HASH) {
      throw new InternalServerError();
    }

    const header = req.headers.authorization;

    if (!header || header.startsWith('Bearer ') === false) {
      throw new UnauthorizedError();
    }

    const token = header.split('Bearer ')[1];

    const payload = jwt.verify(token, NODE_SECRET);

    if (payload === null || typeof payload !== 'string') {
      throw new UnauthorizedError();
    }

    const isValid = await argon2.verify(payload, NODE_HASH);

    if (!isValid) {
      throw new UnauthorizedError();
    }

    next();
  } catch (error) {
    next(error);
  }
}
