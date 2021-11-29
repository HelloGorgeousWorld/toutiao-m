<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highLight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestions: []
    }
  },
  props: {
    searchText: {
      type: String,
      requied: true
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 1000),
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('获取失败，请稍后重试')
      }
    },
    highLight (text) {
      const htmlStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, htmlStr)
    }
  }
}
</script>

<style scoped lang = 'less'>
  .search-suggestion{
    /deep/.active{
      color: #3296fa;
    }
  }
</style>
