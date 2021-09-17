import request from '@/utils/request'

export function adminLogin(data) {
  data.isAdmin = true;
  return request({
    url: '/adminLogin',
    method: 'post',
    data
  })
}

export function initDict(data) {
  data.isAdmin = true;
  return request({
    url: '/initDict',
    method: 'post',
    data
  })
}
