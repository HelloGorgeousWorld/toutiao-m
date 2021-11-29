<template>
    <van-button v-if="!this.is_followed"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="isFollowLoading"
    @click="onFollow"
    >关注</van-button>
    <van-button v-else
    class="follow-btn"
    round
    size="small"
    :loading="isFollowLoading"
    @click="onFollow"
    >已关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  model: {
    prop: 'is_followed',
    event: 'change'
  },
  props: {
    is_followed: {
      type: Boolean,
      required: true
    },
    authorId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isFollowLoading: false
    }
  },
  methods: {
    async onFollow () {
      this.isFollowLoading = true
      try {
        if (this.is_followed) {
          await deleteFollow(this.authorId)
        } else {
          await addFollow(this.authorId)
        }
        this.$emit('change', !this.is_followed)
      } catch (err) {
        let message = '操作失败，请重试！'
        if (err.response && err.response.status === 410) {
          message = '你不能关注你自己！'
        }
        this.$toast(message)
      }
      this.isFollowLoading = false
    }
  }
}
</script>

<style>

</style>
