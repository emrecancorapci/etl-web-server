import type { Request, Response } from 'express';

import * as dataHandler from '@/handlers/data-handler.ts';
import { isTargetIdExist } from '@/handlers/record-handler.ts';
import { InternalServerError } from '@/middlewares/error/base.ts';
import type { Notification } from '@/types.ts';

// biome-ignore lint: not get paid enough to fix this
export async function post(
  request: Request<Record<string, string>, void, Notification>,
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

  if (!isTargetIdExist(id)) {
    console.log('No record found for this id');
    throw new InternalServerError('No record found for this id');
  }

  dataHandler.add(notification);

  response.status(200).send({ message: 'Notification received' });
}
