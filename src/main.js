import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { loadRoutes } from '@/router'
import store from "@/store";
import i18n from '@/locale'
import { loadComponents } from '@/components'
import { loadElementPlusIcons } from '@/plugins/element-plus-icons'

import '@/style/variable.scss';
import '@/style/index.scss'
import '@/style/element/variable.scss';
import '@/style/element/ui.scss';

async function createAppObject() {
  // 需要异步加载路由
  await loadRoutes()

  createApp(App)
    .use(router)
    .use(store)
    .use(i18n)
    .use(loadComponents)
    .use(loadElementPlusIcons)
    .mount('#app')
}

createAppObject()

