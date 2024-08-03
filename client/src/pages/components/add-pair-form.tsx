import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface Properties {
  onSubmit: SubmitHandler<{ destinationId: string }>;
}

export default function AddPairForm({ onSubmit }: Properties) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ destinationId: string }>();

  return (
    <form
      className="flex flex-col gap-6 py-2"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="flex w-full flex-col gap-1 font-semibold" htmlFor="makineId">
        <p className="ps-2 text-lg font-thin">Gönderilecek Id</p>
        <Input
          type="text"
          id="makineId"
          {...register('destinationId', { required: 'This field is required' })}
        />
        {errors.destinationId && <p>{errors.destinationId.message}</p>}
      </label>
      <Button size="sm" type="submit">
        Gönder
      </Button>
    </form>
  );
}
