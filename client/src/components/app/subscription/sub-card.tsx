import type { SubscriptionResponse } from '@/types';
import AddPairPopover from './pair/add-pair-popover';
import DeleteSubscription from './delete-sub-button';
import type { ReactNode } from 'react';

export default function SubscriptionCard({ sub }: { sub: SubscriptionResponse }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-background px-0 py-2 text-card-foreground shadow-sm">
      <h2 className="px-4 py-1 text-xl font-bold text-primary">{sub.description}</h2>
      <ul className="grid w-full border-y border-border">
        <KeyValuePair title="Durum" value={sub.status == 'active' ? 'Aktif' : 'Pasif'} />
        <KeyValuePair title="Abonelik Id" value={sub.id} />
        <KeyValuePair title="Makine Id" value={sub.subject.entities[0].id} />
        <KeyValuePair
          title="Hedef Id"
          value={
            sub.targetId ? sub.targetId : <AddPairPopover sourceId={sub.subject.entities[0].id} />
          }
        />
        <KeyValuePair title="Periyot (sn)" value={sub.throttling} />
        <KeyValuePair title="Gönderim Sayısı" value={sub.notification.timesSent ?? 0} />
        <KeyValuePair
          title="Son Gönderim"
          value={
            sub.notification.lastNotification
              ? new Date(sub.notification.lastNotification).toUTCString()
              : 'Henüz Gerçekleşmedi'
          }
        />
        <KeyValuePair title="Hata Sayısı" value={sub.notification.failsCounter ?? 0} />
        {sub.notification.lastFailure && (
          <KeyValuePair
            title="Son Hata Tarihi"
            value={new Date(sub.notification.lastFailure).toUTCString()}
          />
        )}
        {sub.notification.lastFailure && (
          <KeyValuePair title="Son Hata Sebebi" value={sub.notification.lastFailureReason} />
        )}
      </ul>
      <div className="flex justify-between px-4">
        <DeleteSubscription id={sub.id} />
      </div>
    </div>
  );
}

function KeyValuePair({ title, value }: { title: string; value: ReactNode }) {
  return (
    <li className="grid grid-cols-3 *:p-1 *:ps-4 odd:bg-primary/[2%] even:bg-white/5">
      <p className="col-span-1 flex items-center font-semibold">{title}:</p>
      <p className="col-span-2 flex items-center">{value}</p>
    </li>
  );
}
