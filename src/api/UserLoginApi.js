import request from '@/utils/request'

export function userLogin(data) {
    return request({
      url: '/doLogin',
      method: 'post',
      data
    })
  }

  export function initDict(data) {
    return request({
      url: '/initDict',
      method: 'post',
      data
    })
  }