import * as http from 'node:http';

import app from './app.ts';

const NODE_PORT = Number(process.env.NODE_PORT) || 5000;

http
  .createServer(app)
  .listen(NODE_PORT)
  .on('listening', () => {
    console.log(`Server is running on http://localhost:${NODE_PORT}`);
  });
