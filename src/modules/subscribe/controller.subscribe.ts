import { Request, Response } from 'express';

import { getToken } from '@/helpers/get-token.ts';

export async function post(_: Request, response: Response) {
  const token = await getToken();

  const subscriptionRequest = {
    description: 'Main Subscription',
    notification: {
      httpCustom: {
        url: `${process.env.SERVER_URL}/api/notify`,
        method: 'POST',
      },
      // Notification'da gelecek veriler
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
    // Notification'lar arasındaki minimum süre (saniye)
    throttling: 8 * 60,
  };

  const serverAnswer = await fetch(`${process.env.SOURCE_API_URI}/orion/v2/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subscriptionRequest),
  });

  const answerJson = await serverAnswer.json();

  console.log('Subscription response:', answerJson);

  if (serverAnswer.ok) {
    response.status(201).send({ message: 'Subscription created successfully', data: answerJson });
  } else {
    response
      .status(serverAnswer.status)
      .json({ message: 'Subscription could not be created', error: answerJson });
  }
}
