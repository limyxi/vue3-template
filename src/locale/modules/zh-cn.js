import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import common from './zh-cn/common'

const files = import.meta.globEager('./zh-cn/modules/*.js')
let modules = {}
Object.keys(files).forEach((c) => {
  const module = files[c].default
  const moduleName = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2')
  modules[moduleName] = module
})

const lang = {
  el: zhLocale.el, // element内部国际化
  language: '中文',
  ...common,
  m: { ...modules }
}

export default lang