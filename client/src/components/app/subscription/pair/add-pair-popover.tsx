import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import AddPairForm from './add-pair-form';
import { useTokenStore } from '@/token-store';

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export default function AddPairPopover({ sourceId }: { sourceId: string }) {
  const [open, setOpen] = useState(false);
  const token = useTokenStore((s) => s.token);

  const { isError, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: async (data: { destinationId: string }) => {
      const request = {
        sourceId,
        destinationId: data.destinationId,
      };

      if (!token) {
        throw new Error('Token bulunamadı. Lütfen tekrar giriş yapınız.');
      }

      await fetch(`${import.meta.env.VITE_APP_URI as string}/api/pair`, {
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
  });

  const onSubmit = useCallback(
    async (formData: { destinationId: string }) => {
      console.log(formData);
      await mutateAsync(formData);
    },
    [mutateAsync]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button className="h-auto p-0 font-semibold" size="sm" variant="link">
          Id Ekle
        </Button>
      </PopoverTrigger>
      <PopoverContent className="dark">
        <AddPairForm onSubmit={onSubmit} />
        {isError && <p>{error.message}</p>}
        {isSuccess && <p>Başarıyla gönderildi.</p>}
      </PopoverContent>
    </Popover>
  );
}
