export type ThemeId = 'ink-jade' | 'vermillion-cream' | 'bamboo-light'

export interface Theme {
  id: ThemeId
  name: string
  bg: string
  bgCard: string
  border: string
  accent: string
  accentText: string
  text: string
  textMuted: string
  hanzi: string
}

export const THEMES: Theme[] = [
  {
    id: 'ink-jade',
    name: 'Ink & Jade',
    bg: '#0c0a09',
    bgCard: '#1c1917',
    border: '#292524',
    accent: '#059669',
    accentText: '#6ee7b7',
    text: '#f5f5f4',
    textMuted: '#a8a29e',
    hanzi: '#34d399',
  },
  {
    id: 'vermillion-cream',
    name: 'Vermillion & Cream',
    bg: '#fdf6ec',
    bgCard: '#f5ead8',
    border: '#e8d5b7',
    accent: '#c0392b',
    accentText: '#c0392b',
    text: '#2c1810',
    textMuted: '#7c5c3e',
    hanzi: '#c0392b',
  },
  {
    id: 'bamboo-light',
    name: 'Bamboo Light',
    bg: '#f9fafb',
    bgCard: '#f3f4f6',
    border: '#e5e7eb',
    accent: '#4d7c5f',
    accentText: '#4d7c5f',
    text: '#1a1a1a',
    textMuted: '#4b5563',
    hanzi: '#4d7c5f',
  },
]

export const DEFAULT_THEME: ThemeId = 'ink-jade'

export function getTheme(id: string): Theme {
  return THEMES.find(t => t.id === id) ?? THEMES[0]
}

export function applyTheme(id: ThemeId) {
  document.documentElement.setAttribute('data-theme', id)
  localStorage.setItem('hanzi-landing-theme', id)
}

export function loadSavedTheme(): ThemeId {
  if (typeof window === 'undefined') return DEFAULT_THEME
  const saved = localStorage.getItem('hanzi-landing-theme') as ThemeId | null
  const theme = saved ?? DEFAULT_THEME
  applyTheme(theme)
  return theme
}
