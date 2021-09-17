import request from '@/utils/request'

// ================================================园所简介==================================================
export function getSchoolIntroduciton(data) {
  return request({
    url: '/initSchoolIntroduction',
    method: 'post',
    data
  })
}
export function updasteSchoolIntroduciton(data) {
  return request({
    url: '/editSchoolIntroduction',
    method: 'post',
    data
  })
}
// ==============================================轮播图===================================================
export function uploadSlideshowImg(data) {
  return request({
    url: '/doUploadImg',
    method: 'post',
    data
  })
}
export function getSlideshow(data) {
  return request({
    url: '/initSlideshow',
    method: 'post',
    data
  })
}
export function addSlideshow(data) {
  return request({
    url: '/addSlideshow',
    method: 'post',
    data
  })
}
export function updateSlideshow(data) {
  return request({
    url: '/editSlideshow',
    method: 'post',
    data
  })
}
export function delSlideshow(data) {
  return request({
    url: '/delSlideshow',
    method: 'post',
    data
  })
}
// ==============================================明星宝宝===================================================
export function uploadStarBabyImg(data) {
  return request({
    url: '/doUploadImg',
    method: 'post',
    data
  })
}
export function getStarBaby(data) {
  return request({
    url: '/initStarBaby',
    method: 'post',
    data
  })
}
export function addStarBaby(data) {
  return request({
    url: '/addStarBaby',
    method: 'post',
    data
  })
}
export function updateStarBaby(data) {
  return request({
    url: '/editStarBaby',
    method: 'post',
    data
  })
}
export function delStarBaby(data) {
  return request({
    url: '/delStarBaby',
    method: 'post',
    data
  })
}
// ==============================================师资力量===================================================
export function uploadTeacherTeamImg(data) {
  return request({
    url: '/doUploadImg',
    method: 'post',
    data
  })
}
export function getTeacherTeam(data) {
  return request({
    url: '/initTeacherTeam',
    method: 'post',
    data
  })
}
export function addTeacherTeam(data) {
  return request({
    url: '/addTeacherTeam',
    method: 'post',
    data
  })
}
export function updateTeacherTeam(data) {
  return request({
    url: '/editTeacherTeam',
    method: 'post',
    data
  })
}
export function delTeacherTeam(data) {
  return request({
    url: '/delTeacherTeam',
    method: 'post',
    data
  })
}
// ==============================================园所展示===================================================
export function uploadSchoolShowImg(data) {
  return request({
    url: '/doUploadImg',
    method: 'post',
    data
  })
}
export function getSchoolShow(data) {
  return request({
    url: '/initSchoolShow',
    method: 'post',
    data
  })
}
export function addSchoolShow(data) {
  return request({
    url: '/addSchoolShow',
    method: 'post',
    data
  })
}
export function updateSchoolShow(data) {
  return request({
    url: '/editSchoolShow',
    method: 'post',
    data
  })
}
export function delSchoolShow(data) {
  return request({
    url: '/delSchoolShow',
    method: 'post',
    data
  })
}
