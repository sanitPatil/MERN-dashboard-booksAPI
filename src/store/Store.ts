import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface accessState {
  token: string;
  setToken: (accessToken: string) => void;
}

const useTokenStore = create<accessState>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        setToken: (accessToken) => set(() => ({ token: accessToken })),
      }),
      {
        name: 'access-token',
      }
    )
  )
);

interface ThemeStore {
  mode: boolean;
}
const useTheme = create<ThemeStore>()(
  devtools(
    persist(
      (set) => ({
        mode: true,
        setMode: () => set((state) => ({ mode: !state.mode })),
      }),
      {
        name: 'theme',
      }
    )
  )
);

export { useTokenStore, useTheme };
