<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('click-close')"
      />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <div class="scroll-wrap">
        <CommentItem
        :comment="comment"
        />
        <!-- /当前评论项 -->

        <van-cell title="所有回复" />

        <!-- 评论的回复列表 -->
        <CommentList
        :source="comment.com_id"
        type="c"
        />
    </div>
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <div class="post-wrap">
        <van-button
        class="post-btn"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button>
    </div>
    <!-- /底部 -->
    <!-- 发布评论 -->
    <van-popup
        v-model="isPostShow"
        position="bottom"
    >
    <CommentPost
    :target="comment.com_id"
    @oncomment-success="onPostSuccess"
    />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem, CommentList, CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onPostSuccess () {
      this.isPostShow = false
    }
  }
}
</script>

<style scoped lang="less">
.scroll-wrap{
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
}
.post-wrap{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    .post-btn{
      width: 60%;
    }
}
</style>
