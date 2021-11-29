<template>
  <div class="update-gender">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
export default {
  name: 'updateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
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
        const localGender = this.localGender
        await updateUserProfile({
          gender: localGender
        })
        this.$emit('input', localGender)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    },
    onChange (picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style scoped lang="less">

</style>
