import { create } from 'zustand';

type TokenStore = {
  token: string | undefined;
  setToken: (token: string) => void;
  refreshToken: () => void;
  login: (pass: string) => void;
};

function getToken() {
  return localStorage.getItem('token') || undefined;
}

export const useTokenStore = create<TokenStore>()((set) => ({
  token: getToken(),
  setToken: (token: string) => {
    set(() => ({ token }));
    localStorage.setItem('token', token);
  },
  refreshToken: () => {
    const token = getToken();
    if (token) {
      set(() => ({ token }));
    }
  },
  login: (pass: string) => {
    void fetch(`/api/login`, {
      method: 'POST',
      body: JSON.stringify({ pass }),
    }).then(async (res) => {
      if (res.ok) {
        const { token } = (await res.json()) as { token: string };
        set(() => ({ token }));
        localStorage.setItem('token', token);
      }
    });
  },
}));
