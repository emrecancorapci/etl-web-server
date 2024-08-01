import type { SourceSubscription } from './types';
import { useEffect, useState } from 'react';

function getLocation() {
  const location = window.location.href;

  return `http://${location.split('/')[2]}`;
}

export default function Subscriptions() {
  const [subs, setSubs] = useState<SourceSubscription[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    fetch(`${getLocation()}/api/subscription`, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(({ data: _data }: { data: SourceSubscription[] }) => {
        console.log('Internal Data: ', _data);
        setSubs(_data);
        setLoading(false);
        console.log('Data: ', subs);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          setError(error);
          setLoading(false);
        } else {
          setError(new Error('An unknown error occurred'));
          setLoading(false);
        }
      });
    console.log('DataX: ', subs);
  }, []);

  return (
    <div className="text-white">
      {getLocation()}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {subs && subs.length > 0
        ? subs.map((sub, index) => (
            <div key={index}>
              <h2>{sub.description}</h2>
              <p>{sub.description}</p>
            </div>
          ))
        : !loading && <p>No subscriptions found</p>}
    </div>
  );
}
