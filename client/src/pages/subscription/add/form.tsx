import { useForm, type SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FormInput {
  sourceId: string;
  destinationId: string;
  serverUrl: string;
}

interface Properties {
  onSubmit: SubmitHandler<FormInput>;
}

export default function AddSubscription({ onSubmit }: Properties) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  return (
    <form
      className="flex w-full flex-col content-center items-center gap-4 p-4 px-12"
      onSubmit={void handleSubmit(onSubmit)}
    >
      <label>
        Makine Id
        <Input type="text" {...register('sourceId', { required: 'This field is required' })} />
        {errors.sourceId && <p>{errors.sourceId.message}</p>}
      </label>
      <label>
        Hedef Id
        <Input type="text" {...register('destinationId', { required: 'This field is required' })} />
        {errors.destinationId && <p>{errors.destinationId.message}</p>}
      </label>
      <Button type="submit">Submit</Button>
    </form>
  );
}
