import type { Request, Response } from 'express';

import * as dataHandler from '@/handlers/data-handler.ts';
import { getTargetId } from '@/handlers/machine-handler.ts';
import { InternalServerError } from '@/middlewares/error/base.ts';
import type { Notification, RequestParams } from '@/types.ts';

// biome-ignore lint: not get paid enough to fix this
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

  dataHandler.add(notification);

  console.log('Data added to the handler:', notification);

  response.status(200).send({ message: 'Notification received' });
}
