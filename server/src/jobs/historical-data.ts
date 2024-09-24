import { format } from '@/handlers/data-handler.ts';
import { getAll } from '@/handlers/record-handler.ts';
import { destFetcher, srcFetcher } from '@/helpers/fetch.ts';
import type { DestinationBody } from '@/types.ts';

const DELAY_SECONDS = 6;

const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
const ONE_SECOND = 1000;

export async function sendHistoricalDataJob() {
  await sendHistoricalData(1);
}

export async function sendHistoricalData(months: number) {
  const records = getAll();

  if (!records) {
    console.error('No records found while sending historical data');
    return;
  }

  for (const sourceId of Object.keys(records)) {
    const destId = records[sourceId];

    console.log('Sending historical data from', sourceId, 'to', destId);

    const { endDateString } = (await fetchMissingData(destId)) ?? { endDateString: undefined };

    if (!endDateString) {
      console.error(
        'Error while fetching missing dates data from DESTINATION. Taking current date.'
      );
    }

    const now = new Date();
    now.setHours(now.getHours() + 3);

    const endDate = new Date(endDateString ?? now);
    endDate.setMinutes(1, 0, 0);
    const startDate = new Date(endDate.getTime() - months * ONE_MONTH);

    const missingData = await fetchHistoricalData(sourceId, startDate, endDate);

    if (!missingData) {
      console.error('Error while fetching historical data from SOURCE');
      return;
    }

    console.log('Fetched historical data:', missingData);

    missingData.map((data) => format(data, destId, data.timestamp)).forEach(sendData);

    console.log(`Historical data sent from ${startDate} to ${endDate}`);
  }
}

async function fetchMissingData(id: string) {
  const uri = '/AQI/GetMissingDates=stationId=' + id;

  console.log('Fetching missing data from DESTINATION:', uri);

  const response: Response = await destFetcher().get(uri);

  if (!response.ok) {
    console.error(
      'Error while fetching missing data for target id: ' +
        id +
        '\nResponse: ' +
        response.statusText
    );
    return;
  }

  const {
    objects: { StartDate: startDateString, EndDate: endDateString },
  } = (await response.json()) as MissingDataResponse;

  return { startDateString, endDateString };
}

async function fetchHistoricalData(
  id: string,
  startDate: Date,
  endDate: Date
): Promise<HistoricalData[] | undefined> {
  const params = new URLSearchParams({
    timerel: 'between',
    timeAt: startDate.toISOString(),
    endTimeAt: endDate.toISOString(),
    interval: '60',
    groupType: 'avg',
  });

  const uri = '/historical/' + id + '?' + params.toString();

  console.log('Fetching historical data from SOURCE:', uri);

  const response = await srcFetcher().get('/historical/' + id + '?' + params.toString());

  if (!response.ok) {
    console.error('Error while fetching historical data from SOURCE');
    return;
  }

  return (await response.json()) as HistoricalData[];
}

async function sendData(data: DestinationBody) {
  const serverResponse = await destFetcher()
    .post('/AQI/SendData', data)
    .catch((error) => {
      console.error('Error while forwarding the notification:', error);
    });

  if (!serverResponse) {
    console.error('No response from the destination');
    return;
  }

  if (!serverResponse.ok) {
    console.error('Response was not ok:' + data.Readtime);
    const json = await serverResponse.json();
    console.error('Destination response:', json);
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, DELAY_SECONDS * ONE_SECOND));
}

interface HistoricalData {
  timestamp: string;
  NO2: number;
  O3: number;
  CO: number;
  SO2: number;
  PM1: number;
  PM10: number;
  PM2P5: number;
  pressure: number;
  temperature: number;
  relativeHumidity: number;
  battery: number;
}

interface MissingDataResponse {
  result: boolean;
  message: string | null;
  objects: {
    StartDate: string;
    EndDate: string;
    MissingDates: string[];
  };
}
