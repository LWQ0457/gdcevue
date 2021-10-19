import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: 'api/', // api的base_url
  timeout: 30000 // request timeout
})

// request interceptor
// 添加请求拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  config.headers['Cache-Control'] = 'no-cache' // ie清缓存，否则无法正常刷新
  config.headers['Pragma'] = 'no-cache' // HTTP/1.1版本，ie清缓存，否则无法正常刷新
  config.headers['Content-Type'] = 'application/json'
  config.headers['token'] = localStorage.getItem('token')
  if (config.showLoading) {
    showFullScreenLoading()
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone interceptor
// 添加响应拦截器
service.interceptors.response.use(
  response => {
    if (response.config.showLoading) {
      tryHideFullScreenLoading()
    }
    var res = response.data
    // 以下请根据后端返回具体格式修改!!!!!
    if (res.code === 200) {
      return res
    } else if (res.code === 205) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      router.push({ 'path': '/' })
    } else {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res)
    }
  },
  error => {
    // 错误处理
    tryHideFullScreenLoading()
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 加载封装
let loading
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
// 关闭加载
function endLoading() {
  loading.close()
}
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
export default service
