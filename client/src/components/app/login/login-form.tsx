import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface Form {
  pass: string;
}

interface Properties {
  onSubmit: SubmitHandler<{ pass: string }>;
}

export default function LoginForm({ onSubmit }: Properties) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  return (
    <form
      className="flex flex-col gap-4 py-2"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="flex w-full flex-col gap-1 font-semibold" htmlFor="makineId">
        <p className="ps-2 text-lg font-thin text-white">Şifre</p>
        <Input
          type="text"
          id="makineId"
          placeholder="Şifrenizi buraya giriniz"
          {...register('pass', { required: 'This field is required' })}
        />
        {errors.pass && <p>{errors.pass.message}</p>}
      </label>
      <Button size="sm" type="submit">
        Giriş Yap
      </Button>
    </form>
  );
}
