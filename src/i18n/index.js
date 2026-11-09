import en from './en'
import si from './si'
import ta from './ta'

const dictionaries = { en, si, ta }
let current = 'en'

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'si', label: 'සිංහල' },
  { code: 'ta', label: 'தமிழ்' },
]

export function setLanguage(code) {
  if (dictionaries[code]) current = code
}

function lookup(obj, path) {
  return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj)
}

// t('nav.home') -> current language, then English, then the key itself
export function t(key) {
  const own = lookup(dictionaries[current], key)
  if (own !== undefined) return own
  const fallback = lookup(dictionaries.en, key)
  return fallback !== undefined ? fallback : key
}
