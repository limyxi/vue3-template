const routes = {
  path: '/',
  name: 'Layout',
  component: () => import('@/components/Layout/index.vue'),
  redirect: '/home',
  children: [
    {
      name: 'views/home',
      path: '/home',
      meta: {
        title: '首页',
        icon: 'desktop',
      },
      component: () => import('@/views/home.vue'),
    }
  ],
}

export default routes
