<template>
  <div class="user-profile">
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input
     type="file"
     hidden
     ref="file"
     @change="onFileChange"
     >
    <van-cell-group>
      <van-cell title="头像" is-link center>
        <van-image
          round
          class="avatar"
          fit="cover"
          :src="user.photo"
          @click="$refs.file.click()"
        />
      </van-cell>
      <van-cell
       title="昵称"
        is-link
        :value="user.name"
        @click="isUpdateNameShow=true"
        />
      <van-cell title="性别" is-link :value="user.gender === 0 ? '男' : '女'"
      @click="isUpdateGenderShow=true"/>
      <van-cell title="生日" is-link :value="user.birthday"
      @click="isUpdateBirthdayShow=true"/>
    </van-cell-group>
    <!-- 编辑昵称 -->
    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      :style="{ height: '100%' }">
      <updateName
      v-if="isUpdateNameShow"
      v-model="user.name"
      @close="isUpdateNameShow = false"
      />
    </van-popup>
    <!-- 编辑昵称 -->
    <!-- 编辑性别 -->
    <van-popup
      v-model="isUpdateGenderShow"
      position="bottom">
      <updateGender
      v-if="isUpdateGenderShow"
      v-model="user.gender"
      @close="isUpdateGenderShow = false"
      />
    </van-popup>
    <!-- 编辑性别 -->
    <!-- 编辑生日 -->
    <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom">
      <updateBirthday
      v-if="isUpdateBirthdayShow"
      v-model="user.birthday"
      @close="isUpdateBirthdayShow = false"
      />
    </van-popup>
    <!-- 编辑生日 -->
    <!-- 编辑头像 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%">
      <updatePhoto
      v-if="isUpdatePhotoShow"
      :img="img"
      @close="isUpdatePhotoShow = false"
      />
    </van-popup>
    <!-- 编辑头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import updateBirthday from './components/update-birthday.vue'
import updateGender from './components/update-gender.vue'
import updateName from './components/update-name.vue'
import updatePhoto from './components/update-photo.vue'
export default {
  name: 'UserProfile',
  components: {
    updateBirthday, updateGender, updateName, updatePhoto
  },
  data () {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      console.log(data)
      this.user = data.data
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.user-profile{
  .avatar{
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}

</style>
