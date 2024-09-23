import type { DestinationBody, Notification } from '@/types.ts';

let data: { id: string; n: Notification[]; initDate: Date }[] = [];

export function add(dataItem: Notification): void {
  const item = data.find((item) => item.id === dataItem.id);

  if (!item) {
    data.push({ id: dataItem.id, n: [dataItem], initDate: new Date() });
  } else {
    item.n.push(dataItem);
  }
}

export function clearId(id: string): void {
  const item = data.find((item) => item.id === id);

  if (item) Object.assign(item, { id: item.id, n: [], initDate: new Date() });
}

export function clearAll(): void {
  data = [];
}

export function getDataIdsReadyToSend(): string[] {
  return data
    .filter(({ initDate }) => new Date().getTime() - initDate.getTime() >= 60 * 60 * 1000)
    .map(({ id }) => id);
}

export function getAverage(id: string): Notification | undefined {
  const item = data.find((item) => item.id === id);

  if (!item) {
    console.error('No data found for this id');
    return;
  }

  const { n } = item;

  const sumData = n.reduce(
    (acc, current) => {
      acc.PM10 += current.PM10;
      acc.PM2P5 += current.PM2P5;
      acc.SO2 += current.SO2;
      acc.CO += current.CO;
      acc.NO2 += current.NO2;
      acc.O3 += current.O3;
      acc.PM1 += current.PM1;
      acc.pressure += current.pressure;
      return acc;
    },
    {
      PM10: 0,
      PM2P5: 0,
      SO2: 0,
      CO: 0,
      NO2: 0,
      O3: 0,
      PM1: 0,
      pressure: 0,
    }
  );

  const avarageData = {
    // Take the last value of the array
    id: n[n.length - 1].id,
    type: n[n.length - 1].type,
    relativeHumidity: n[n.length - 1].relativeHumidity,
    temperature: n[n.length - 1].temperature,
    // Calculate the average
    PM10: sumData.PM10 / n.length,
    PM2P5: sumData.PM2P5 / n.length,
    SO2: sumData.SO2 / n.length,
    CO: sumData.CO / n.length,
    NO2: sumData.NO2 / n.length,
    O3: sumData.O3 / n.length,
    PM1: sumData.PM1 / n.length,
    pressure: sumData.pressure / n.length,
  };

  return avarageData;
}

export function format(data: Omit<Notification, 'id' | 'type'>, targetId: string, dateString?: string): DestinationBody {
  const date = new Date(Date.now());
  date.setHours(date.getHours() + 3, 0, 0, 0);

  return {
    Stationid: targetId,
    Readtime: dateString ?? date.toISOString(),
    SoftwareVersion: 'v1.0.0',
    Period: 60,
    PM10: data.PM10,
    PM10_Status: 1,
    PM25: data.PM2P5,
    PM25_Status: 1,
    SO2: data.SO2,
    SO2_Status: 1,
    CO: data.CO,
    CO_Status: 1,
    NO2: data.NO2,
    NO2_Status: 1,
    O3: data.O3,
    O3_Status: 1,
    PM1: data.PM1,
    PM1_Status: 1,
    HavaBasinci: data.pressure,
    HavaBasinci_Status: 1,
    BagilNem: data.relativeHumidity,
    BagilNem_Status: 1,
    Sicaklik: data.temperature,
    Sicaklik_Status: 1,
  };
}
