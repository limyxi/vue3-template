import enLocale from 'element-plus/lib/locale/lang/en'
import common from './en/common'

const files = import.meta.globEager('./en/modules/*.js')
let modules = {}
Object.keys(files).forEach((c) => {
  const module = files[c].default
  const moduleName = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2')
  modules[moduleName] = module
})

const lang = {
  el: enLocale.el, // element内部国际化
  language: 'English',
  ...common,
  m: { ...modules }
}

export default lang