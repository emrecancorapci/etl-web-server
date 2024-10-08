import * as dataHandler from '@/handlers/data-handler.ts';
import { getAll, getTargetIdBySourceId } from '@/handlers/record-handler.ts';
import { destFetcher } from '@/helpers/fetch.ts';

export async function sendDataJob() {
  const records = getAll();

  if (!records) {
    console.error('No records found while sending data');
    return;
  }

  for (const srcId of Object.keys(records)) {
    const data = dataHandler.getAverage(srcId);

    if (!data) {
      console.info(`No data found for the source id: ${srcId}`);
      continue;
    }
    
    const destId = getTargetIdBySourceId(srcId);

    if (!destId) {
      console.error(`No destination found for the source id: ${srcId}`);
      continue;
    }

    const formatted = dataHandler.format(data, destId);

    console.log('Formatted notification:', formatted);

    const serverResponse = await destFetcher()
      .post('/AQI/SendData', formatted)
      .catch((error) => {
        console.error('Error while forwarding the notification:', error);
      });

    if (!serverResponse) {
      console.error('No response from the destination');
      return;
    }

    console.log('Notification forwarded to the destination');

    if (!serverResponse.ok) {
      console.error('Response was not ok');
      const json = await serverResponse.json();
      console.error('Destination response:', json);
      return;
    }

    dataHandler.clearId(srcId);

    const json = await serverResponse.json();

    console.log('Destination response:', json);
  }
}
