import * as dataHandler from '@/handlers/data-handler.ts';
import { getAllIdPairs } from '@/handlers/machine-handler.ts';
import { fetchDestination } from '@/helpers/fetch.ts';

export async function sendDataJob() {
  const pairs = getAllIdPairs();

  for (const { srcId, destId } of pairs) {
    const data = dataHandler.getAverage(srcId);

    if (!data) {
      console.info(`No data found for the source id: ${srcId}`);
      continue;
    }

    const formatted = dataHandler.format(data, destId);

    console.log('Formatted notification:', formatted);

    const serverResponse = await fetchDestination()
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
