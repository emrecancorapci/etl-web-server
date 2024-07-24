import { Request, Response } from 'express';

import { addIdPair } from '@/handlers/machine-handler.ts';
import { sourceFetch } from '@/helpers/fetch.ts';
import { InternalServerError } from '@/middlewares/error/base.ts';
import { RequestParams } from '@/types.ts';

interface PostRequestBody {
  sourceId: string;
  destinationId: string;
}

interface ResponseBody {
  message: string;
  data?: unknown;
  error?: unknown;
}

export async function post(
  request: Request<RequestParams, ResponseBody, PostRequestBody>,
  response: Response<ResponseBody>
) {
  const { sourceId, destinationId } = request.body;

  const subscriptionRequest = {
    description: `${sourceId} Subscription`,
    entites: [
      {
        id: sourceId,
        type: 'info',
      },
    ],
    notification: {
      httpCustom: {
        url: `${process.env.SERVER_URL}/api/notify`,
        method: 'POST',
      },
      // Notification'da gelecek veriler
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
    // Notification'lar arasındaki minimum süre (saniye)
    throttling: 8 * 60,
  };

  const serverAnswer = await sourceFetch().post('/orion/v2/subscriptions', subscriptionRequest);

  if (!serverAnswer.ok) {
    const error = await serverAnswer.json();

    throw new InternalServerError(error.description);
  }

  const answerJson = await serverAnswer.json();

  console.log('Subscription response:', answerJson);

  if (serverAnswer.ok) {
    addIdPair(sourceId, destinationId);
    response.status(201).send({ message: 'Subscription created successfully', data: answerJson });
  } else {
    response
      .status(serverAnswer.status)
      .json({ message: 'Subscription could not be created', error: answerJson });
  }
}
