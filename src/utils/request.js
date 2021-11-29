import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/app', // 基础路径
  transformResponse: [function (data) {
    try {
      return jsonBig.parse(data)
    } catch (error) {
      return {
        data
      }
    }
  }]
})

request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
export default request
