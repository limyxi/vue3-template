import { createI18n } from 'vue-i18n'
import store from '@/store'

const files = import.meta.globEager('./modules/*.js')

let messages = {}
Object.keys(files).forEach((c) => {
  const module = files[c].default
  const moduleName = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2')
  messages[moduleName] = module
})

const lang = store.state.app.lang || navigator.userLanguage || navigator.language
const locale = lang.indexOf('en') !== -1 ? 'en' : 'zh-cn'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: locale,
  messages
})
document.querySelector('html').setAttribute('lang', locale)

export default i18n


export const getCurrentMessage = () => {
  return messages[locale]
}


