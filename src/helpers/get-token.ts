let token: string | undefined = '';
let refreshToken: string | undefined = '';

export async function getToken() {
  if (token) {
    const response = await sourceTokenReceiver();

    token = response.access_token;
    refreshToken = response.refresh_token;

    setTimeout(() => {
      token = undefined; // Token'ı bir saat sonra geçersiz kılma
    }, 3600000); // 3600000 ms = 1 saat
  }

  return token;
}

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

interface SourceTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

interface SourceTokenRequest {
  grant_type: 'client_credentials' | 'refresh_token';
  client_id?: string;
  client_secret?: string;
  refresh_token?: string;
}
