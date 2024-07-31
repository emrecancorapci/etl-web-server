import http from 'node:http';

import app from './app.ts';

const {
  SOURCE_API_URI,
  SOURCE_CLIENT_ID,
  SOURCE_CLIENT_SECRET,
  TARGET_API_URI,
  TARGET_USERNAME,
  TARGET_PASSWORD,
  NODE_PORT
} = process.env;

if (
  !(
    SOURCE_API_URI &&
    SOURCE_CLIENT_ID &&
    SOURCE_CLIENT_SECRET &&
    TARGET_API_URI &&
    TARGET_USERNAME &&
    TARGET_PASSWORD
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
