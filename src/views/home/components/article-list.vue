<template>
  <div class="article-list">
    <van-pull-refresh
     v-model="isRefreshLoading"
     @refresh="onRefresh"
     loading-text="加载中..."
     error-text="加载失败，稍后重试"
     :finished-text="refreshSuccessText"
     >
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
      >
          <ArticleItem
            v-for="(article, index) in list"
            :key="index"
            :article="article"
            ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import ArticleItem from './article-item.vue'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isRefreshLoading: false,
      refreshSuccessText: '刷新成功'
    }
  },
  created () {
  },
  methods: {
    // 加载数据
    async myLoading () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.push(...results)
        // 3.加载状态结束
        this.loading = false
        // 4数据全部加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.timestamp = data.data.pre_timestamp
          this.finished = true
        }
      } catch (err) {
        console.log('失败1', err)
        this.error = true
        this.loading = false
      }
    },
    async onLoad () {
      // 异步更新数据
      await this.myLoading()
      if (this.timestamp) {
        this.loading = false
        this.finished = true
        this.myLoading()
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp,
          with_top: 1
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
        this.timestamp = data.data.pre_timestamp
        // 加载结束
        this.isRefreshLoading = false
      } catch (error) {
        console.log(error)
        this.isRefreshLoading = false
        this.$toast('刷新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
