<template>
  <div class="update-name">
      <!-- 导航栏 -->
      <van-nav-bar
        title="设置昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onConfirm"
      ></van-nav-bar>
      <!-- 输入框 -->
      <div class="field-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入昵称"
        show-word-limit
        />
      </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
export default {
  name: 'updateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0
      })
      try {
        const localName = this.message
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await updateUserProfile({
          name: localName
        })
        this.$emit('input', localName)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.field-wrap{
  padding-top: 10px;
}
</style>
