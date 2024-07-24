import type { Request, Response } from 'express';

import { addIdPair } from '@/handlers/machine-handler.ts';
import { sourceFetch } from '@/helpers/fetch.ts';
import { BadRequestError, InternalServerError } from '@/middlewares/error/base.ts';
import type { RequestParams, SourceErrorResponse } from '@/types.ts';

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

  if (!sourceId || !destinationId) {
    throw new BadRequestError('SourceId and DestinationId are required.');
  }

  if (!(typeof sourceId === 'string') || !(typeof destinationId === 'string')) {
    throw new BadRequestError('SourceId and DestinationId must be strings.');
  }

  const description = `${sourceId} Subscription`;
  const url = `${request.protocol}://${request.get('host')}/api/notify`;

  const subscriptionRequest = {
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

  console.log('Subscription request:', subscriptionRequest);

  const serverAnswer = await sourceFetch().post('/orion/v2/subscriptions', subscriptionRequest);

  if (!serverAnswer.ok) {
    const error = (await serverAnswer.json()) as SourceErrorResponse;

    console.error('Subscription error:', error);

    throw new InternalServerError(error.description);
  }

  console.log('Subscription created successfully');

  addIdPair(sourceId, destinationId);
  response.status(201).send({ message: 'Subscription created successfully' });
}
