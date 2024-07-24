import type { Request, Response } from 'express';

import { BadRequestError } from '@/middlewares/error/base.ts';
import type { RequestParams } from '@/types.ts';

import { createSubscription } from './utils/create-subscription.ts';
import { generateSubscriptionRequest } from './utils/generate-subscription-request.ts';

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

  const subscriptionRequest = generateSubscriptionRequest(description, sourceId, url);

  console.log('Subscription request:', subscriptionRequest);

  await createSubscription(subscriptionRequest, sourceId, destinationId);

  response.status(201).send({ message: 'Subscription created successfully' });
}
