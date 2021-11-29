<template>
    <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
      :immediate-check="false"
    >
      <CommentItem
      v-for="(comment, index) in list"
      :key="index"
      :comment="comment"
      @click-reply="$emit('click-reply', $event)"
      />
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import { getComments } from '@/api/comment.js'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    source: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      default: 'a',
      validator (value) {
        return ['a', 'c'].includes(value)
      }
    }
  },
  data () {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 请求下一页数据的页码
      totalCount: 0, // 总数据条数
      error: false
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    async onLoad () {
      this.loading = true
      try {
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: 20
        })
        // 2. 将数据添加到列表中
        const { results } = data.data
        console.log('评论', data)
        this.list.push(...results)
        this.totalCount = data.data.total_count
        this.$emit('onload-success', data.data)
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) {
          this.offset = data.data.last_id // 更新获取下一页数据的页码
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
  .publish-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .van-list {
    margin-bottom: 45px;
  }
</style>
