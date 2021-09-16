import request from '@/utils/request'

export function init(params) {
  return request({
    url: '/initAudit',
    method: 'post',
    params
  })
}

export function doAgree(params) {
    return request({
      url: '/doAudit',
      method: 'post',
      params
    })
}