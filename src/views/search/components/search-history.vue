<template>
  <div class="search-history">
      <van-cell title="搜索历史">
        <div v-if="isDeleteShow">
          <span @click="$emit('clear-search-history')">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDeleteShow = false">完成</span>
        </div>
        <van-icon name="delete-o" v-else @click="isDeleteShow = true" />
      </van-cell>
      <van-cell
       :title="item"
       v-for="(item, index) in searchHistories"
       :key="index"
       @click="onSearch(item, index)"
       >
        <van-icon name="close" v-show="isDeleteShow"/>
      </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onSearch (item, index) {
      if (this.isDeleteShow === true) {
        // 编辑状态，删除
        this.searchHistories.splice(index, 1)
      } else {
        // 非编辑状态
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style>

</style>
