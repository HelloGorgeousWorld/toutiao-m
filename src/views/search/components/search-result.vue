<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
       v-for="(article, index) in list"
       :key="index"
       :title="article.title"
        />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      requied: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchResults({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        console.log(data)
        const { results } = data.data
        this.list.push(...results)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast('搜索失败')
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
