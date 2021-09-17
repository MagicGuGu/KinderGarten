import request from '@/utils/request'

export function selectClassRoom(data) {
  return request({
    url: '/queryClassroomBySelect',
    method: 'post',
    data
  })
}
export function selectTeacher(data) {
  return request({
    url: '/queryTeacherBySelect',
    method: 'post',
    data
  })
}
export function selectClass(data) {
  return request({
    url: '/initClass',
    method: 'post',
    data
  })
}
export function updateClass(data) {
  return request({
    url: '/updateClass',
    method: 'post',
    data
  })
}
export function addClass(data) {
  return request({
    url: '/addClass',
    method: 'post',
    data
  })
}
export function deleteClass(data) {
  return request({
    url: '/delClass',
    method: 'post',
    data
  })
}
