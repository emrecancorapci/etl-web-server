import type { SubscriptionRequest } from "@/types.ts";

export function generateSubscriptionRequest(description: string, sourceId: string, url: string): SubscriptionRequest {
  return {
    description,
    subject: {
      entities: [
        {
          id: sourceId,
          type: 'data',
        },
      ],
      conditions: {
        attrs: [
          'relativeHumidity',
          'NO2',
          'PM10',
          'PM2P5',
          'pressure',
          'CO',
          'SO2',
          'temperature',
          'O3',
          'PM1',
        ],
      },
    },
    notification: {
      httpCustom: {
        url,
        method: 'POST',
      },
      attrs: [
        'relativeHumidity',
        'NO2',
        'PM10',
        'PM2P5',
        'pressure',
        'CO',
        'SO2',
        'temperature',
        'O3',
        'PM1',
      ],
      attrsFormat: 'simplifiedKeyValues',
    },
    throttling: 8 * 60,
  };
}