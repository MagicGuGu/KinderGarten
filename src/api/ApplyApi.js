import request from '@/utils/request'

export function handleApply(data) {
  data.isAdmin = true;
  return request({
    url: '/doApply',
    method: 'post',
    data
  })
}
