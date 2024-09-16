import type { DestinationBody, Notification } from '@/types.ts';

let data: Notification[] = [];

export function addData(dataItem: Notification): void {
  data.push(dataItem);
}

export function clearData(): void {
  data = [];
}

export function getDataLength(): number {
  return data.length;
}

export function exportData(id: string): DestinationBody {
  const sumData = data.reduce(
    (acc, curr) => {
      acc.PM10 += curr.PM10;
      acc.PM2P5 += curr.PM2P5;
      acc.SO2 += curr.SO2;
      acc.CO += curr.CO;
      acc.NO2 += curr.NO2;
      acc.O3 += curr.O3;
      acc.PM1 += curr.PM1;
      acc.pressure += curr.pressure;
      acc.relativeHumidity += curr.relativeHumidity;
      acc.temperature += curr.temperature;
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
      relativeHumidity: 0,
      temperature: 0,
    }
  );

  const avarageData = {
    PM10: sumData.PM10 / data.length,
    PM2P5: sumData.PM2P5 / data.length,
    SO2: sumData.SO2 / data.length,
    CO: sumData.CO / data.length,
    NO2: sumData.NO2 / data.length,
    O3: sumData.O3 / data.length,
    PM1: sumData.PM1 / data.length,
    pressure: sumData.pressure / data.length,
    relativeHumidity: data[data.length - 1].relativeHumidity,
    temperature: data[data.length - 1].temperature,
  };

  return dataFormatter(avarageData, id);
}

export function dataFormatter(data: FormatterNotification, targetId: string): DestinationBody {
  return {
    Stationid: targetId,
    Readtime: new Date(Date.now() + 3 * 60 * 59 * 1000 ).toISOString(),
    SoftwareVersion: 'v1.0.0',
    Period: 8,
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

type FormatterNotification = {
  PM10: number;
  PM2P5: number;
  SO2: number;
  CO: number;
  NO2: number;
  O3: number;
  PM1: number;
  pressure: number;
  relativeHumidity: number;
  temperature: number;
};
