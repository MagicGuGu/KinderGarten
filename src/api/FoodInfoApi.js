import request from '@/utils/request'

export function initFood(data) {
  return request({
    url: '/initFood',
    method: 'post',
    data
  })
}
export function addFood(data) {
  return request({
    url: '/addFood',
    method: 'post',
    data
  })
}
export function addFoods(data) {
  return request({
    url: '/addFoods',
    method: 'post',
    data
  })
}
export function updateFood(data) {
  return request({
    url: '/updateFood',
    method: 'post',
    data
  })
}
