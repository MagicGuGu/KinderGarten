import request from '@/utils/request'

export function selectTeacherInfo(data) {
  return request({
    url: '/initTeacher',
    method: 'post',
    data
  })
}

export function editTeacherInfo(data) {
  return request({
    url: '/editTeacher',
    method: 'post',
    data
  })
}

export function delTeacherInfo(data) {
  return request({
    url: '/delTeacher',
    method: 'post',
    data
  })
}

export function addTeacherInfo(data) {
  return request({
    url: '/addTeacher',
    method: 'post',
    data
  })
}

