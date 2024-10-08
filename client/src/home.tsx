import { useQuery } from '@tanstack/react-query';

import AddSubscriptionModal from '@/components/app/subscription/add-sub-modal';
import SubscriptionCard from '@/components/app/subscription/sub-card';
import type { SubscriptionResponse } from './types';
import { useTokenStore } from './token-store';

export default function Home() {
  const token = useTokenStore((s) => s.token);

  const {
    data: subs,
    isPending,
    isError,
    error,
  } = useQuery<SubscriptionResponse[], { message: string }>({
    queryKey: ['subscriptions', token],
    queryFn: async () => {
      if (!token) {
        throw new Error('Token bulunamadı. Lütfen tekrar giriş yapınız.');
      }
      const response = await fetch(`/api/subscription`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { data } = (await response.json()) as { data: SubscriptionResponse[] };

      return data;
    },
  });

  return (
    <div className="flex w-full flex-col gap-4 p-4 text-white">
      <h2 className="w-full text-5xl font-bold text-primary shadow-sm">Abonelikler</h2>
      <div className="flex w-full justify-center px-4">
        <AddSubscriptionModal />
      </div>
      <div className="grid w-full grid-cols-1 flex-col gap-4 lg:grid-cols-2">
        {isPending && (
          <div className="flex h-40 w-80 items-center justify-center">
            <p className="text-2xl">Yükleniyor...</p>
          </div>
        )}
        {!isPending && subs && subs.length > 0
          ? subs.map((sub) => <SubscriptionCard key={sub.id} sub={sub} />)
          : !isPending && <p>Abonelik bulunamadı.</p>}
        {isError && !error.message.startsWith('JSON.parse') && (
          <div className="grid rounded-lg bg-destructive p-4">
            <h3 className="text-xl font-bold text-destructive-foreground">Hata</h3>
            <p> {error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
