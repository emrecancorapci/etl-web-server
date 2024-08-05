import { useForm, type SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { AddSubscriptionRequest } from '@/types';

interface Properties {
  onSubmit: SubmitHandler<AddSubscriptionRequest>;
}

export default function AddSubscriptionForm({ onSubmit }: Properties) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSubscriptionRequest>();

  return (
    <form
      className="flex w-full flex-col content-center items-center gap-4 p-4"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="w-full" htmlFor="makineId">
        <p className="px-2 py-1 text-lg font-thin">Makine Id</p>
        <Input
          type="text"
          id="makineId"
          {...register('sourceId', { required: 'This field is required' })}
        />
        {errors.sourceId && <p>{errors.sourceId.message}</p>}
      </label>
      <label className="w-full" htmlFor="hedefId">
        <p className="px-2 py-1 text-lg font-thin">Hedef Id</p>
        <Input
          type="text"
          id="hedefId"
          {...register('destinationId', { required: 'This field is required' })}
        />
        {errors.destinationId && <p>{errors.destinationId.message}</p>}
      </label>
      <Button className="w-48 py-6" type="submit">
        Gönder
      </Button>
    </form>
  );
}
