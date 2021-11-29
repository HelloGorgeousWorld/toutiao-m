<template>
  <div class="search-container">
    <form action="/" class="search-form">
        <van-search
            v-model="searchText"
            background="#3296fa"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
            @focus="isResultShow = false"
        />
    </form>
    <SearchResult
        v-if="isResultShow"
        :searchText="searchText"
    ></SearchResult>
    <SearchSuggestion
     v-else-if="searchText"
     :searchText="searchText"
     @search="onSearch"
     ></SearchSuggestion>
    <SearchHistory
     v-else
     :searchHistories="searchList"
     @search="onSearch"
     @clear-search-history="searchList = []"
     >
    </SearchHistory>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchList: getItem('TOUTIAO_SEARCH_HISTORY') || []
    }
  },
  watch: {
    searchList (value) {
      console.log(value)
      setItem('TOUTIAO_SEARCH_HISTORY', value)
    }
  },
  methods: {
    onSearch (val) {
      console.log(val)
      this.searchText = val
      // 存储搜索内容
      const indexO = this.searchList.indexOf(val)
      if (indexO !== -1) {
        this.searchList.splice(indexO, 1)
      }
      this.searchList.unshift(val)
      // 展示搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
  .search-container{
    padding-top: 108px;
    .van-search__action{
      color: #fff;
    }
    .search-form{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
  }
</style>
