import type { Request, Response } from 'express';

import { getTargetId } from '@/handlers/machine-handler.ts';
import { dataFormatter } from '@/helpers/data-formatter.ts';
import { fetchDestination } from '@/helpers/fetch.ts';
import { InternalServerError } from '@/middlewares/error/base.ts';
import type { Notification, RequestParams } from '@/types.ts';

export async function post(
  request: Request<RequestParams, void, Notification>,
  response: Response
) {
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
    throw new InternalServerError('No target found for this notification');
  }

  console.log(`Notification forwarded to ${targetId}`);

  const formatted = dataFormatter(notification, targetId);

  console.log('Formatted notification:', formatted);

  const serverResponse = await fetchDestination()
    .post('/AQI/SendData', formatted)
    .catch((error) => {
      console.error('Error while forwarding the notification:', error);
      throw new InternalServerError('Error while forwarding the notification');
    });

  console.log('Notification forwarded to the destination');

  if (!serverResponse.ok) {
    const json = await serverResponse.json();
    console.error('Destination response:', json);
    throw new InternalServerError('Error while forwarding the notification');
  }

  const json = await serverResponse.json();

  console.log('Destination response:', json);

  response.status(200).send({ message: 'Notification received' });
}
