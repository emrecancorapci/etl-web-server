import { Request, Response } from 'express';

import { getTargetId } from '@/handlers/machine-handler.ts';
import { dataFormatter } from '@/helpers/data-formatter.ts';
import { fetchDestination } from '@/helpers/fetch.ts';
import { Notification, RequestParams } from '@/types.ts';

export async function post(request: Request<RequestParams, void, Notification>, response: Response) {
  const { id, type, relativeHumidity, NO2, PM10, PM2P5, pressure, CO, SO2, temperature, O3, PM1 } =
    request.body;

  const notification = {
    id,
    type,
    relativeHumidity,
    NO2,
    PM10,
    PM2P5,
    pressure,
    CO,
    SO2,
    temperature,
    O3,
    PM1,
  };

  console.log('Notification received:', notification);

  const targetId = getTargetId(id);

  if (!targetId) {
    console.log('No target found for this notification');
    return;
  }

  console.log(`Notification forwarded to ${targetId}`);

  const formatted = dataFormatter(notification, targetId);

  const serverResponse = await fetchDestination()
    .post('/AQI/SendData', formatted)
    .catch((err) => {
      throw new Error(err.message);
    });

  if (!serverResponse.ok) {
    throw new Error();
  }

  console.log('Notification forwarded to the destination');

  response.status(200).send({ message: 'Notification received' });
}
