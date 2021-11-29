import request from '@/utils/request'
// import store from '@/store/index.js'
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
// 关注用户
export const addFollow = authorId => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: authorId
    }
  })
}
// 取消关注用户
export const deleteFollow = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}
// 修改用户个人信息
export const updateUserProfile = params => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    params
  })
}
// 修改用户照片信息
export const updateUserPhoto = params => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    params
  })
}
