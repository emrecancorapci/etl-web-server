import type { Request, Response } from 'express';

import * as recordHandler from '@/handlers/record-handler.ts';
import { BadRequestError } from '@/middlewares/error/base.ts';
import type { RequestParams } from '@/types.ts';

interface PostRequestBody {
  sourceId: string;
  destinationId: string;
}

interface ResponseBody {
  message?: string;
  data?: unknown;
  error?: unknown;
}

// biome-ignore lint/suspicious/useAwait: <explanation>
export async function getAll(
  _: Request<RequestParams, ResponseBody>,
  response: Response<ResponseBody>
) {
  const ids = recordHandler.getAll();
  response.status(200).send({ data: ids });
}

// biome-ignore lint/suspicious/useAwait: <explanation>
export async function getTarget(
  request: Request<RequestParams, ResponseBody>,
  response: Response<ResponseBody>
) {
  const record = recordHandler.getBySourceId(request.params.id);
  const targetId = record ? Object.keys(record)[1] : undefined;

  if (!targetId) {
    return response.status(404).send({ error: 'Record not found.' });
  }

  response.status(200).send({ data: { targetId } });
}

// biome-ignore lint/suspicious/useAwait: <explanation>
export async function getSource(
  request: Request<RequestParams, ResponseBody>,
  response: Response<ResponseBody>
) {
  const record = recordHandler.getByTargetId(request.params.id);

  const sourceId = record ? Object.keys(record)[0] : undefined;

  response.status(200).send({ data: { sourceId } });
}

// biome-ignore lint/suspicious/useAwait: <explanation>
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

  recordHandler.set(sourceId, destinationId);

  console.log('Id pair set:', sourceId, destinationId);

  response.status(201).send({ data: { sourceId, destinationId } });
}

// biome-ignore lint/suspicious/useAwait: <explanation>
export async function patch(
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

  recordHandler.set(sourceId, destinationId);

  console.log('Id pair updated:', sourceId, destinationId);

  response.status(200).send({ data: { sourceId, destinationId } });
}

// biome-ignore lint/suspicious/useAwait: <explanation>
export async function deleteByTargetId(
  request: Request<RequestParams, ResponseBody>,
  response: Response<ResponseBody>
) {
  const { id } = request.params;

  recordHandler.deleteByTargetId(id);

  console.log('Id pair removed by target id:', id);

  response.status(200).send({ data: { targetId: id } });
}

// biome-ignore lint/suspicious/useAwait: <explanation>
export async function deleteBySourceId(
  request: Request<RequestParams, ResponseBody>,
  response: Response<ResponseBody>
) {
  const { id } = request.params;

  recordHandler.deleteBySourceId(id);

  console.log('Id pair removed source id:', id);

  response.status(200).send({ data: { sourceId: id } });
}
