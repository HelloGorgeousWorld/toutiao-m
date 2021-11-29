import request from '@/utils/request'
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
export const addUserChannel = channels => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    channels
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
