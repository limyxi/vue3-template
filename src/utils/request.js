/**
 * axios封装
 */
import axios from 'axios'
import qs from 'qs'
import { useStore } from '@/store'
import { isNull } from './index'
import { Error as error } from './message'
import router from '@/router'
import { loginIgnore } from '@/router/guards'

// 取消请求
const CancelToken = axios.CancelToken
const source = CancelToken.source()

/**
 * 根据请求类型设置请求头的ContentType
 * @param type {'json' | 'file' | 'url'} json代表json请求体，file代表上传文件，url即其他请求
 * @return {undefined | {[k: 'Content-Type']: *}}
 */
export function genContentType(type) {
  const key = 'Content-Type'
  let value
  switch (type) {
    case 'json':
      value = 'application/json; charset=utf-8'
      break
    case 'file':
      value = 'multipart/form-data'
      break
    case 'url':
      value = 'application/x-www-form-urlencoded; charset=utf-8'
      break
  }

  return value && { [key]: value }
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 90000,
  paramsSerializer: (params) => {
    return qs.stringify(params, { allowDots: true, arrayFormat: 'repeat' })
  },
})

service.interceptors.request.use((config) => {
  // 需要设置jwt请求头
  const store = useStore()
  // token
  const token = store.getters.token
  // 当前路由
  const currentRoute = router.currentRoute.value.path

  // 如果没有token，并且不是不需要token的请求则取消请求
  if (isNull(token) && !loginIgnore.includes(currentRoute)) {
    config.cancelToken = source.token
    source.cancel()
  }

  const contentType = config.headers['Content-Type']
  const method = config.method
  if (
    method === 'post' &&
    !isNull(contentType) &&
    contentType.includes('urlencoded')
  ) {
    config.data = qs.stringify(config.data, {
      allowDots: true,
      arrayFormat: 'indices',
    })
  }
  return config
})

service.interceptors.response.use(
  (response) => {
    const { data, config } = response
    // 使用blob下载时返回经过axios包装后完整的响应内容
    if (config.responseType === 'blob') return response
    const valid = handleCustomError(response)
    if (valid !== true) return Promise.reject(valid)
    return data
  },
  (e) => {
    handleAxiosError(e)
    return Promise.reject(e)
  }
)

/**
 * 处理接口中可能的自定义错误
 *
 * @param response {import('axios').AxiosResponse}
 * @return {Error|true} 返回true时说明没有错误
 */
export function handleCustomError(response) {
  const { data, config } = response
  if (data.code !== 200) {
    // token失效需要重新登录
    if (data.code === 501) {
      router.push('/login')
      return data
    }

    const errorMessage = data.message
    if (!isNull(errorMessage) && !config.NOERRORTIP) {
      error(errorMessage)
    }
    return data
  }
  return true
}

/**
 * 处理axios响应错误
 *
 * @param e {import('axios').AxiosError | Error}
 */
export function handleAxiosError(e) {
  if (!e.isAxiosError || !e.response) return

  switch (e.response.status) {
    case 404:
      // eslint-disable-next-line no-case-declarations
      const url = e.response.config.url
      error(`[404]：${url}`)
      break
    case 500:
    default:
      // eslint-disable-next-line no-case-declarations
      const msg = e.response.data.message || '网络开小差~~，请稍后再试'
      error(msg)
      break
  }
}

/**
 * @param url {string}
 * @param config {import('axios').AxiosRequestConfig?}
 * @return {Promise}
 */
export function get(url, config) {
  return service.get(url, config)
}

/**
 * @param url {string}
 * @param data {*?}
 * @param config {import('axios').AxiosRequestConfig?}
 * @return {Promise}
 */
export function post(url, data, config) {
  return service.post(url, data, config)
}

/**
 * @param url {string}
 * @param config {import('axios').AxiosRequestConfig?}
 * @return {Promise}
 */
export function del(url, config) {
  return service.delete(url, config)
}

/**
 * 使用blob下载文件
 *
 * @param url {string}
 * @param config {import('axios').AxiosRequestConfig?}
 * @return {Promise<Blob>}
 */
export function download(url, config) {
  const cfg = Object.assign(
    { url, method: 'post', responseType: 'blob', data: config },
    config
  )
  return new Promise((resolve) => {
    service(cfg).then((res) => {
      const { data } = res
      // 下载失败
      if (data.type.includes('json')) {
        const reader = new FileReader()
        reader.onload = () => {
          res.data = JSON.parse(reader.result)
          handleCustomError(res)
        }
        reader.readAsText(data)
        return
      }
      const fileObject = res.headers['content-disposition']
      // 获取文件名
      const fileName = decodeURI(fileObject.split('attachment; filename=')[1])
      resolve({
        data,
        fileName,
      })
    })
  })
}
