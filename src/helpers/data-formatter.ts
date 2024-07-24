import { DestinationBody, Notification } from "@/types.ts";

export function dataFormatter(data: Notification, targetId: string): DestinationBody {
  const formatted = {
    Stationid: targetId,
    Readtime: new Date(Date.now()).toUTCString().slice(0, 19),
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

  return formatted;
}
