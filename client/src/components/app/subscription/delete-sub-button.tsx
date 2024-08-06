/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from '@/components/ui/button';
import { useTokenStore } from '@/token-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export default function DeleteSubscription({ id }: { id: string }) {
  const token = useTokenStore((s) => s.token);
  const queryClient = useQueryClient();

  const { isError, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: async (id: string) => {
      if (!token) {
        throw new Error('Token bulunamadı. Lütfen tekrar giriş yapınız.');
      }

      const response = await fetch(`/api/subscription/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });

  const onDelete = useCallback(async () => {
    await mutateAsync(id);
  }, [mutateAsync, id]);

  return (
    <>
      <p>{isError && error.message}</p>
      <Button variant={'destructive'} onClick={() => onDelete()} className="font-semibold">
        {isError ? 'Hata' : isSuccess ? 'Başarılı' : 'Kaldır'}
      </Button>
    </>
  );
}
