import request from '@/utils/request'

export function updatePassword(data) {
  return request({
    url: '/updatePassword',
    method: 'post',
    data
  })
}

export function getUserInfo(data) {
  return request({
    url: '/getUserInfo',
    method: 'post',
    data
  })
}
