import { defineAsyncComponent } from 'vue'
// 加载全局组件
export function loadComponents(app) {
  app.component(
    'SearchForm',
    defineAsyncComponent({
      loader: () => import('./enhance/SearchForm/index.vue'),
    })
  )
  app.component(
    'Card',
    defineAsyncComponent({
      loader: () => import('./Card/index.vue'),
    })
  )
  app.component(
    'TableMore',
    defineAsyncComponent({
      loader: () => import('./More/index.vue'),
    })
  )
  app.component(
    'EnTable',
    defineAsyncComponent({
      loader: () => import('./enhance/LayoutTable/EnTable.vue'),
    })
  )
  app.component(
    'LayoutTable',
    defineAsyncComponent({
      loader: () => import('./enhance/LayoutTable/index.vue'),
    })
  )
}
