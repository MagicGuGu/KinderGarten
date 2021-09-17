import request from '@/utils/request'

export function getSafeEduInfo(data) {
  return request({
    url: '/initSafeEdu',
    method: 'post',
    data
  })
}

export function setExam(data) {
  return request({
    url: '/updateExam',
    contentType: false,
    processdata: false,
    method: 'post',
    data
  })
}

export function setEduVideo(data) {
  return request({
    url: '/updateEduVideo',
    contentType: false,
    processdata: false,
    method: 'post',
    data
  })
}

export function updateSafeEdu(data) {
  return request({
    url: '/updateSafeEdu',
    method: 'post',
    data
  })
}

export function addSafeEdu(data) {
  return request({
    url: '/addSafeEdu',
    method: 'post',
    data
  })
}

export function delSafeEdu(data) {
  return request({
    url: '/delSafeEdu',
    method: 'post',
    data
  })
}
