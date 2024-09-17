import * as recordHandler from '@/handlers/record-handler.ts';
import { resetSourceToken } from '@/handlers/token-handler.ts';
import { sourceFetch } from '@/helpers/fetch.ts';
import { BadRequestError, InternalServerError } from '@/middlewares/error/base.ts';
import type { SourceErrorResponse, SubscriptionRequest } from '@/types.ts';

export async function createSubscription(
  subReq: SubscriptionRequest,
  sourceId: string,
  destId: string
) {
  if (recordHandler.isSourceIdExist(sourceId)) {
    throw new BadRequestError(`Subscription already exists for sourceId: ${sourceId}`);
  }

  const serverAnswer = await sourceFetch().post('/orion/v2/subscriptions', subReq);

  if (!serverAnswer.ok) {
    const error = (await serverAnswer.json()) as SourceErrorResponse;

    console.error('Subscription error:', error);

    if (error.error === 'invalid_client') {
      await resetSourceToken();
      return await createSubscription(subReq, sourceId, destId);
    }

    throw new InternalServerError(error.description);
  }

  console.log('Subscription created successfully');

  recordHandler.set(sourceId, destId);

  console.log('Id pair added:', sourceId, destId);
}
