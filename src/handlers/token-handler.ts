import * as crypto from 'node:crypto';

import type { DestinationTokenRequest, DestinationTokenResponse, SourceTokenRequest, SourceTokenResponse } from '@/types.ts';

let destinationToken: string | undefined = '';
let sourceToken: string | undefined = '';
let refreshToken: string | undefined = '';

/**
 * Retrieves the destination token.
 *
 * If the token is not available, it makes a request to the destination token receiver
 * and sets the token and refresh token values.
 *
 * The token is invalidated after one hour.
 *
 * @returns A promise that resolves to the destination token.
 */
export async function getDestinationToken(): Promise<string> {
  if (!destinationToken) {
    const response = await destinationTokenReceiver();

    destinationToken = response.objects.TicketId;

    setTimeout(() => {
      destinationToken = undefined;
    }, 1800000); // 1800000 ms = 30 dakika
  }

  return destinationToken;
}

/**
 * Retrieves the source token.
 *
 * If the token is not available, it makes a request to the source token receiver
 * and sets the token and refresh token values.
 *
 * The token is invalidated after one hour.
 *
 * @returns A promise that resolves to the source token.
 */
export async function getSourceToken(): Promise<string> {
  if (!sourceToken) {
    const response = await sourceTokenReceiver();

    sourceToken = response.access_token;
    refreshToken = response.refresh_token;

    setTimeout(() => {
      sourceToken = undefined;
    }, 3600000); // 3600000 ms = 1 saat
  }

  return sourceToken;
}

async function destinationTokenReceiver(): Promise<DestinationTokenResponse> {
  const { TARGET_API_URI, TARGET_USERNAME, TARGET_PASSWORD } = process.env;

  if (!TARGET_API_URI || !TARGET_USERNAME || !TARGET_PASSWORD)
    throw new Error('Missing TARGET environment variables. Please check your .env file.');

  const not_enough_crypted_password = crypto
    .createHash('md5')
    .update(TARGET_PASSWORD)
    .digest('hex');

  const password = crypto.createHash('md5').update(not_enough_crypted_password).digest('hex');

  const body: DestinationTokenRequest = {
    username: TARGET_USERNAME,
    password,
  };

  const response = await fetch(`${TARGET_API_URI}/Security/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).catch((err) => {
    throw new Error(err.message);
  });

  if (!response.ok) {
    throw new Error('Response is not OK.');
  }
  const data: DestinationTokenResponse = await response.json();

  if (!data.result) {
    console.error(data);
    throw new Error('Result is false.');
  }

  if (data.objects === null) {
    console.error(data);
    throw new Error('Token is null.');
  }

  return data;
}

/**
 * Retrieves the source token from the source API.
 * @returns A promise that resolves to the source token response.
 */
async function sourceTokenReceiver(): Promise<SourceTokenResponse> {
  const { SOURCE_API_URI } = process.env;
  let path = '/oauth2/token';

  const body: SourceTokenRequest = refreshToken
    ? { grant_type: 'refresh_token', refresh_token: refreshToken }
    : {
        grant_type: 'client_credentials',
        client_id: process.env.SOURCE_CLIENT_ID,
        client_secret: process.env.SOURCE_CLIENT_SECRET,
      };

  const response = await fetch(`${SOURCE_API_URI}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Could not get token');
  }

  return (await response.json()) as SourceTokenResponse;
}
