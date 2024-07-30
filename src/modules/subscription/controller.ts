import type { Request, Response } from 'express';

import { sourceFetch } from '@/helpers/fetch.ts';
import { BadRequestError, InternalServerError } from '@/middlewares/error/base.ts';
import type { RequestParams, SourceErrorResponse } from '@/types.ts';

import { createSubscription } from './utils/create-subscription.ts';
import { generateSubscriptionRequest } from './utils/generate-subscription-request.ts';

interface PostRequestBody {
  sourceId: string;
  destinationId: string;
  serverUrl?: string;
}

interface ResponseBody {
  message?: string;
  data?: unknown;
  error?: unknown;
}

export async function getAll(_: Request, response: Response) {
  const serverResponse = await sourceFetch().get('/orion/v2/subscriptions');

  if (!serverResponse.ok) {
    const error = (await serverResponse.json()) as SourceErrorResponse;

    throw new InternalServerError(error.description);
  }

  const data = await serverResponse.json();

  response.status(200).send({ data });
}

export async function get(request: Request, response: Response) {
  let { id } = request.params;

  const serverResponse = await sourceFetch().get(`/orion/v2/subscriptions/${id}`);

  if (!serverResponse.ok) {
    if (serverResponse.status === 404) {
      throw new BadRequestError('Subscription not found.');
    } else {
      const error = (await serverResponse.json()) as SourceErrorResponse;

      throw new InternalServerError(error.description);
    }
  }

  const data = await serverResponse.json();

  response.status(200).send({ data });
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
  const serverUrl = request.body.serverUrl || `${request.protocol}://${request.get('host')}`;
  const url = `${serverUrl}/api/notification`;

  const subscriptionRequest = generateSubscriptionRequest(description, sourceId, url);

  console.log('Subscription request:', subscriptionRequest);

  await createSubscription(subscriptionRequest, sourceId, destinationId);

  response.status(201).send();
}

export async function del(request: Request, response: Response) {
  let { id } = request.params;

  const serverResponse = await sourceFetch().del(`/orion/v2/subscriptions/${id}`);

  if (!serverResponse.ok) {
    const error = (await serverResponse.json()) as SourceErrorResponse;

    throw new InternalServerError(error.description);
  }

  response.status(204).send();
}
