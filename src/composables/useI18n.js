import { ref, computed } from 'vue'
import en from '../i18n/en.js'
import id from '../i18n/id.js'

const messages = { en, id }
const locale = ref('id')

export function useI18n() {
  const t = (key) => {
    const keys = key.split('.')
    let val = messages[locale.value]
    for (const k of keys) {
      if (val == null) return key
      val = val[k]
    }
    return val ?? key
  }

  const setLocale = (lang) => {
    if (messages[lang]) locale.value = lang
  }

  return { locale, t, setLocale }
}
