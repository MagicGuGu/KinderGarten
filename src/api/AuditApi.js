import request from '@/utils/request'

export function init(data) {
  data.isAdmin = true;
  return request({
    url: '/initAudit',
    method: 'post',
    data
  })
}

export function doAgree(data) {
  data.isAdmin = true;
    return request({
      url: '/doAudit',
      method: 'post',
      data
    })
}