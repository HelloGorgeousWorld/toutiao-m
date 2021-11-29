<template>
    <van-button
      :icon="value === 1 ? 'good-job' : 'good-job-o'"
      :class="{
        Liked: value === 1
      }"
      @click="onLike"
      >
    </van-button>
</template>

<script>
import { addLike, deleteLike } from '@/api/article.js'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
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
    async onLike () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.Liked {
  .van-icon {
    color: #e5645f
  }
}
</style>
