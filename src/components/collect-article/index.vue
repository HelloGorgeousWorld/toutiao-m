<template>
    <van-button
      :icon="value ? 'star' : 'star-o'"
      :class="{
        collected: value
      }"
      @click="onCollect"
      >
    </van-button>
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article.js'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        this.$emit('input', !this.value)
        this.$toast.success(this.value ? '取消收藏成功' : '收藏成功')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.collected {
  .van-icon {
    color: #ffa500
  }
}
</style>
