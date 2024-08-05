import http from 'node:http';

import app from './app.ts';

const {
  SRC_URI,
  SRC_ID,
  SRC_SECRET,
  DEST_URI,
  DEST_EMAIL,
  DEST_PASS,
  NODE_PORT,
  NODE_PASS,
  NODE_SECRET,
  NODE_HASH,
} = process.env;

if (
  !(
    SRC_URI &&
    SRC_ID &&
    SRC_SECRET &&
    DEST_URI &&
    DEST_EMAIL &&
    DEST_PASS &&
    NODE_HASH &&
    NODE_SECRET &&
    NODE_PASS
  )
) {
  throw Error('Some required environment variables are not set');
}

if (!NODE_PORT) {
  console.warn('NODE_PORT is not set, using default port 5000');
}

const PORT = Number(NODE_PORT) || 5000;

http
  .createServer(app)
  .listen(PORT)
  .on('listening', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
