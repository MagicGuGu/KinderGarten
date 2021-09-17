import request from '@/utils/request'

export function getParentInfo(data) {
  return request({
    url: '/initParent',
    method: 'post',
    data
  })
}

export function getBabyInfo(data) {
  return request({
    url: '/initBaby',
    method: 'post',
    data
  })
}

export function updateBaby(data) {
  return request({
    url: '/updateBaby',
    method: 'post',
    data
  })
}

export function updateParent(data) {
  return request({
    url: '/updateParent',
    method: 'post',
    data
  })
}

export function deleteBaby(data) {
  return request({
    url: '/delBaby',
    method: 'post',
    data
  })
}

export function addBaby(data) {
  return request({
    url: '/addBaby',
    method: 'post',
    data
  })
}

export function importBabys(data) {
  return request({
    url: '/importBabys',
    method: 'post',
    data
  })
}

export function getClassInfo(data) {
  return request({
    url: '/initClass',
    method: 'post',
    data
  })
}
