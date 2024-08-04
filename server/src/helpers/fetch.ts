import { getDestinationToken, getSourceToken } from '@/handlers/token-handler.ts';

export function fetchDestination() {
  const { DEST_URI } = process.env;

  async function get(path: string): Promise<Response> {
    const ticketId = await getDestinationToken();

    return await fetch(`${DEST_URI}${path}`, {
      method: 'GET',
      headers: {
        AToken: `{"TicketId": "${ticketId}"}`,
      },
    });
  }

  async function post<T>(path: string, data: T): Promise<Response> {
    const ticketId = await getDestinationToken();

    return await fetch(`${DEST_URI}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        AToken: `{"TicketId": "${ticketId}"}`,
      },
      body: JSON.stringify(data),
    });
  }

  return { get, post };
}

export function sourceFetch() {
  const { SRC_URI } = process.env;

  async function get(path: string): Promise<Response> {
    const token = await getSourceToken();

    return await fetch(`${SRC_URI}${path}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async function post<T>(path: string, data: T): Promise<Response> {
    const token = await getSourceToken();

    return await fetch(`${SRC_URI}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  async function del(path: string): Promise<Response> {
    const token = await getSourceToken();

    return await fetch(`${SRC_URI}${path}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return { get, post, del };
}
