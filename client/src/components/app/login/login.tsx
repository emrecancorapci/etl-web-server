import { useMutation } from '@tanstack/react-query';
import LoginForm from './login-form';
import { useCallback } from 'react';
import { useTokenStore } from '@/token-store';

interface Form {
  pass: string;
}

export default function Login() {
  const setToken = useTokenStore((s) => s.setToken);

  const { isError, isSuccess, isPending, error, mutateAsync } = useMutation({
    mutationFn: async (data: Partial<Form>) => {
      await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async (res) => {
          if (res.ok) {
            const { token } = (await res.json()) as { token: string };

            setToken(token);
          }
          throw new Error('Network response was not ok');
        })
        .catch(() => {
          throw new Error('Network response was not ok');
        });
    },
  });

  const onSubmit = useCallback(
    async (formData: Form) => {
      await mutateAsync(formData);
    },
    [mutateAsync]
  );

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl font-bold text-primary">Giriş Yapmanız Gerekmektedir</h2>
      {!isPending && !isSuccess && <LoginForm onSubmit={onSubmit} />}
      {isError && <p>{error.message}</p>}
    </div>
  );
}
