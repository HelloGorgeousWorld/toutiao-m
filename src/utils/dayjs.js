import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // 全局使用
dayjs().format('YYYY-MM-DD')
//  配置使用处理相对时间的插件
dayjs.extend(relativeTime)
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
