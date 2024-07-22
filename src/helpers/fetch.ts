import { getDestinationToken, getSourceToken } from '@/handlers/token-handler.ts';

export function fetchDestination() {
  const { TARGET_API_URI } = process.env;

  async function get(path: string): Promise<Response> {
    const ticketId = await getDestinationToken();

    return await fetch(`${TARGET_API_URI}${path}`, {
      method: 'GET',
      headers: {
        AToken: `{"TicketId": "${ticketId}"}`,
      },
    });
  }

  async function post<T>(path: string, data: T): Promise<Response> {
    const ticketId = await getDestinationToken();

    return await fetch(`${TARGET_API_URI}${path}`, {
      method: 'POST',
      headers: {
        AToken: `{"TicketId": "${ticketId}"}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  return { get, post };
}

export function sourceFetch() {
  const { SOURCE_API_URI } = process.env;

  async function get(path: string): Promise<Response> {
    const token = await getSourceToken();

    return await fetch(`${SOURCE_API_URI}${path}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async function post<T>(path: string, data: T): Promise<Response> {
    const token = await getSourceToken();

    return await fetch(`${SOURCE_API_URI}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  return { get, post };
}
