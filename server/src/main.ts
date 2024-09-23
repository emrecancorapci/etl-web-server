import http from 'node:http';

import { CronJob } from 'cron';

import app from './app.ts';
import { sendHistoricalData, sendHistoricalDataJob } from './jobs/historical-data.ts';
import { sendDataJob } from './jobs/send-data.ts';

const EVERY_HOUR_WITH_3_MINUTES_OFFSET = '0 3 * * * *';
const THE_START_OF_EVERY_MONTHS = '0 0 0 1 * *';

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

CronJob.from({
  cronTime: EVERY_HOUR_WITH_3_MINUTES_OFFSET,
  onTick: sendDataJob,
  start: true,
});

CronJob.from({
  cronTime: THE_START_OF_EVERY_MONTHS,
  onTick: sendHistoricalDataJob,
  start: true,
});

await sendHistoricalData(2);

http
  .createServer(app)
  .listen(PORT)
  .on('listening', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
