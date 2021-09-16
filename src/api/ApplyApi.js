import request from '@/utils/request'

export function handleApply(params) {
  return request({
    url: '/doApply',
    method: 'post',
    params
  })
}
