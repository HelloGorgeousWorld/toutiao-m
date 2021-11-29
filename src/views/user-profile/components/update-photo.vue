<template>
  <div class="update-photo">
    <img :src="img" alt="" ref="img">
    <div class="tool-bar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onComfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user.js'
export default {
  name: 'updatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      guides: false
    })
  },
  methods: {
    onComfirm () {
      // console.log(this.cropper.getData())
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        console.log(blob)
        const formData = new FormData()

        // Pass the image file name as the third parameter if necessary.
        formData.append('croppedImage', blob/*, 'example.png' */)
        const { data } = await updateUserPhoto(formData)
        console.log(data)
        this.$emit('close')
      })
    }
  }
}
</script>

<style scoped lang="less">
.update-photo{
  background-color: #000;
  height: 100%;
  .img{
    max-width: 100%;
  }
  .tool-bar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel, .confirm {
      width: 100px;
      height: 100px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>
