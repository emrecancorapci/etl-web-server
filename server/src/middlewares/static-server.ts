import path from 'node:path';

import type { NextFunction, Request,Response } from 'express';

import { getDirname } from '@/helpers/get-dir.ts';

export function staticFileServer(req: Request, res: Response, next: NextFunction) {
  if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
    next();
  } else {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.sendFile(path.join(getDirname(), 'public', 'index.html'));
  }
}
