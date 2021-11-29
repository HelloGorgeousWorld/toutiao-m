<template>
  <div class="home-container">
      <van-nav-bar class="page-nav-bar" fixed>
        <van-button
          class="search-btn"
          slot="title"
          type="info"
          size="small"
          round
          icon="search"
          to="/search"
          >搜索</van-button>
      </van-nav-bar>
      <!-- 频道列表 -->
      <van-tabs class="channel-tabs" v-model="active" animated swipeable>
        <van-tab
          v-for="channel in channels"
          :key="channel.id"
          :title="channel.name"
          >
          <!-- 频道中的文章内容 -->
            <ArticleList :channel="channel"></ArticleList>
          </van-tab>
         <!-- /频道列表 -->
        <div slot="nav-right" class="placeholder"></div>
        <div
         slot="nav-right"
         class="hamburger-btn"
         @click="isChannelEditShow = true"
         >
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </van-tabs>
               <!-- 弹出层 -->
        <van-popup
          class="edit-channel-popup"
          v-model="isChannelEditShow"
          closeable
          close-icon-position="top-left"
          position="bottom"
          :style="{ height: '100%' }"
        >
          <ChannelEdit
            :mychannel="channels"
            :active="active"
            @update-active="updateActive"
            />
        </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { getUserChannels } from '@/api/user.js'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  methods: {
    async loadChannels () {
      try {
        let channels = []
        // 是否登录
        if (this.user) {
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录，本地有数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            // 本地有数据
            channels = localChannels
          } else {
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (error) {
        this.$toast('获取用户频道失败')
      }
    },
    updateActive (index, isChannelEditShow = true) {
      //  更新频道激活项
      this.active = index
      //  关闭编辑频道弹层
      this.isChannelEditShow = isChannelEditShow
    }
  },
  created () {
    this.loadChannels()
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar__title {
    // max-width: unset;
    .search-btn{
    width: 500px;
    height: 64px;
    font-size: 28px;
    background-color: #5babfb;
    border: none;
    .van-icon {
      font-size: 32px;
    }
    }
  }
  /deep/ .channel-tabs{
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      z-index: 1;
      right: 0;
      left: 0;
    }
    .van-tab{
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active{
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line{
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .placeholder{
      flex-shrink: 0;
      height: 82px;
      width: 66px;
    }
    .hamburger-btn{
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      };
      &:before {
        content: '';
        position: absolute;
        left: 0;
        background-image: url(~@/assets/gradient-gray-line.png);
        width: 1px;
        height: 100%;
        background-size: contain;
      }
    }
  }
  .edit-channel-popup {
    padding-top: 100px;
    box-sizing: border-box;
  }
}
</style>
