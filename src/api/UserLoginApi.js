import request from '@/utils/request'

export function userLogin(params) {
    params.isUser=true;
    return request({
      url: '/doLogin',
      method: 'post',
      params
    })
  }