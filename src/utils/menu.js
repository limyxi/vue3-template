function getMenuChildren(list) {
  return list
    .map((item) => {
      if (item.hiddenStatus !== '1') {
        return {
          id: item.id,
          name: item.componentPath
            ? item.componentPath.split('.')[0]
            : item.name,
          parentId: item.parentId,
          path: item.requestPath,
          icon: item.icon,
          meta: {
            title: (item.meta && item.meta.name) || item.name,
          },
          children:
            item.children && item.children.length
              ? getMenuChildren(item.children)
              : [],
        }
      }
    })
    .filter((item) => item)
}
function getRouteChildren(list) {
  let arr = []
  let createRoute = (list) => {
    list.map((item) => {
      // category为2才是生成的路由
      if (item.category == '2') {
        arr.push({
          id: item.id,
          name: item.componentPath && item.componentPath.split('.')[0],
          path: item.requestPath,
          viewPath: item.componentPath,
          meta: {
            title: (item.meta && item.meta.name) || item.name,
            // 接口返回的缓存，默认全部缓存
            cacheStatus: getCacheStatus(item.cacheStatus),
          },
        })
      }
      if (item.children && item.children.length) {
        createRoute(item.children)
      }
    })
  }
  createRoute(list)
  return arr
}
/**
 * 将接口返回的路由处理为菜单和路由
 * @param list {array}  需要处理的接口返回的所有路由
 * @return {array}
 */
export function handleMenu(list, type) {
  if (type === 'menu') {
    return getMenuChildren(list)
  }
  if (type === 'route') {
    return getRouteChildren(list)
  }
}
/**
 * 处理接口返回的缓存状态，默认为true
 * @param cacheStatus {string}  缓存状态
 * @return {boolean}
 */
export function getCacheStatus(cacheStatus) {
  if (cacheStatus === '' || cacheStatus === undefined || cacheStatus === null) {
    return true
  }
  if (cacheStatus == 1) {
    return true
  }
  return false
}