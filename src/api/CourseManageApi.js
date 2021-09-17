import request from '@/utils/request'

export function initCourse(data) {
  return request({
    url: '/initCourse ',
    method: 'post',
    data
  })
}


export function addCourses(data) {
  return request({
    url: '/addCourses',
    method: 'post',
    data
  })
}

export function addCourse(data) {
  return request({
    url: '/addCourse',
    method: 'post',
    data
  })
}

export function updateCourse(data) {
  return request({
    url: '/updateCourse',
    method: 'post',
    data
  })
}

export function deleteCourse(data) {
  data.isUser = true;
  return request({
    url: '/deleteCourse',
    method: 'post',
    data
  })
}

