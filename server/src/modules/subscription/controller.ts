import type { Request, Response } from 'express';

import { getTargetId, removePairBySourceId } from '@/handlers/machine-handler.ts';
import { sourceFetch } from '@/helpers/fetch.ts';
import { BadRequestError, InternalServerError } from '@/middlewares/error/base.ts';
import type { RequestParams, SourceErrorResponse, SubscriptionResponse } from '@/types.ts';

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
  const rawResponse = await sourceFetch().get('/orion/v2/subscriptions');

  if (!rawResponse.ok) {
    const error = (await rawResponse.json()) as SourceErrorResponse;

    throw new InternalServerError(error.description);
  }

  const serverResponse = (await rawResponse.json()) as SubscriptionResponse[];

  const data = serverResponse.map((subscription: SubscriptionResponse) => {
    const targetId = getTargetId(subscription.subject.entities[0].id);

    return { ...subscription, targetId };
  });

  response.status(200).send({ data });
}

export async function get(request: Request, response: Response) {
  let { id } = request.params;

  const rawResponse = await sourceFetch().get(`/orion/v2/subscriptions/${id}`);

  if (!rawResponse.ok) {
    if (rawResponse.status === 404) {
      throw new BadRequestError('Subscription not found.');
    } else {
      const error = (await rawResponse.json()) as SourceErrorResponse;

      throw new InternalServerError(error.description);
    }
  }

  const serverResponse = (await rawResponse.json()) as SubscriptionResponse;

  const targetId = getTargetId(serverResponse.subject.entities[0].id);

  const data = { ...serverResponse, targetId };

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

  const rawResponse = await sourceFetch().get(`/orion/v2/subscriptions/${id}`);

  if (!rawResponse.ok) {
    if (rawResponse.status === 404) {
      throw new BadRequestError('Subscription not found.');
    } else {
      const error = (await rawResponse.json()) as SourceErrorResponse;

      throw new InternalServerError(error.description);
    }
  }

  const serverResponse = await sourceFetch().del(`/orion/v2/subscriptions/${id}`);

  if (!serverResponse.ok) {
    const error = (await serverResponse.json()) as SourceErrorResponse;

    throw new InternalServerError(error.description);
  }

  const getServerResponse = (await rawResponse.json()) as SubscriptionResponse;

  removePairBySourceId(getServerResponse.subject.entities[0].id);

  response.status(204).send();
}
