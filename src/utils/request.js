import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'
import util from '@/utils/Utils.js'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_URL, 
  timeout: 215000, // request timeout
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  transformRequest: [
    function(data) {
      return JSON.stringify(data)
    }
  ]
})

// 请求拦截
service.interceptors.request.use(
  config => {
    if(config.method == 'post'){
      config.baseURL = config.data.isAdmin?process.env.VUE_APP_BASE_URL:process.env.VUE_APP_BASE_USER_URL
    }
    // 请求前
    if (store.getters.token) {
      // 让每个请求携带自定义token
      config.headers.token = util.getToken4Session()
      // config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    Message({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data
    if (response.headers.token) {
      util.saveToken2Session(response.headers.token)
    }
    // 200为成功标志
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // error 系统错误
    // console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
