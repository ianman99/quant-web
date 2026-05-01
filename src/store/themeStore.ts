import { create } from 'zustand'

interface ThemeState {
  theme: 'light' | 'dark'
  toggle: () => void
}

const getInitial = (): 'light' | 'dark' =>
  (localStorage.getItem('theme') as 'light' | 'dark') || 'light'

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitial(),
  toggle: () =>
    set((s) => {
      const next = s.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', next)
      document.documentElement.setAttribute('data-theme', next)
      return { theme: next }
    }),
}))
