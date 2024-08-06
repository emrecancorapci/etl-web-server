import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import AddSubscriptionForm from './add-sub-form';
import type { AddSubscriptionRequest } from '@/types';
import { useTokenStore } from '@/token-store';

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export default function AddSubscription() {
  const token = useTokenStore((s) => s.token);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { isError, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: async (data: Partial<AddSubscriptionRequest>) => {
      const request = {
        sourceId: data.sourceId,
        destinationId: data.destinationId,
        serverUrl: `${import.meta.env.VITE_APP_URI as string}/api/notification`,
      };

      if (!token) {
        throw new Error('Token bulunamadı. Lütfen tekrar giriş yapınız.');
      }

      await fetch(`/api/subscription`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).catch(() => {
        throw new Error('Network response was not ok');
      });

      void wait().then(() => {
        setOpen(false);
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });

  const onSubmit = useCallback(
    async (formData: AddSubscriptionRequest) => {
      console.log(formData);
      await mutateAsync(formData);
    },
    [mutateAsync]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="font-semibold">Yeni Abonelik</Button>
      </DialogTrigger>
      <DialogContent className="dark bg-card">
        <DialogHeader className="text-3xl font-thin text-primary">Abonelik Ekle</DialogHeader>
        <DialogDescription>
          <AddSubscriptionForm onSubmit={onSubmit} />
          {isError && <p>{error.message}</p>}
          {isSuccess && <p>Başarıyla gönderildi.</p>}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
