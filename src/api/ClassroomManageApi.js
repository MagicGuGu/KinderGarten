import request from '@/utils/request'

export function initClassroom(data) {
  return request({
    url: '/initClassroom ',
    method: 'post',
    data
  })
}

export function addClassroom(data) {
  return request({
    url: '/addClassroom',
    method: 'post',
    data
  })
}

export function updateClassroom(data) {
  return request({
    url: '/updateClassroom',
    method: 'post',
    data
  })
}

export function deleteClassroom(data) {
  return request({
    url: '/deleteClassroom',
    method: 'post',
    data
  })
}


export function addClassrooms(data) {
  return request({
    url: '/addClassrooms',
    method: 'post',
    data
  })
}

