<template>
  <div class="channel-edit">
    <van-cell :border='false'>
      <div slot="title" class="title-text">我的频道</div>
      <van-button
       class="edit-btn"
       type="danger"
       plain
       round
       size="mini"
       @click="isEdit = !isEdit"
       >{{ isEdit ? '完成' :'编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10"  class="my-grid">
        <van-grid-item
        class="channel-item"
        v-for="(channel, index) in mychannel"
        :key="index"
        @click="onMyChannelClick(channel, index)"
        >
        <!-- 叉叉按钮 -->
            <van-icon
             slot="icon"
             name="clear"
             v-show="isEdit && !fixedChannel.includes(channel.id)"
             ></van-icon>
            <span
             slot="text"
             class="text"
             :class="{ active: index === active }"
              >{{channel.name}}</span>
        </van-grid-item>
    </van-grid>
    <van-cell :border='false'>
        <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
        <van-grid-item
        class="channel-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        @click="onAddChannel(channel)"
        :text="channel.name" />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEdit',
  props: {
    mychannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fixedChannel: [0, 11]
    }
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (error) {
        this.$toast('获取用户频道失败')
      }
    },

    async onAddChannel (channel) {
      this.mychannel.push(channel)
      //   数据持久化
      if (this.user) {
        //  保存到线上
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.mychannel.length
          })
        } catch (error) {
          this.$toast('保存失败')
        }
      } else {
        //  未登录，把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.mychannel)
      }
    },

    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 编辑状态
        if (this.fixedChannel.includes(channel.id)) {
          return
        }
        if (index <= this.active) {
          // 如果当前删除的小于激活的索引
          this.$emit('update-active', this.active - 1, true)// 传默认的参数
        }
        this.mychannel.splice(index, 1)
        // 持久化删除频道
        this.deleteChannel(channel)
      } else {
        // 非编辑状态，切换首页频道
        this.$emit('update-active', index, false)
      }
    },

    async deleteChannel (channel) {
      if (this.user) {
        // 登录状态
        await deleteUserChannel(channel.id)
      } else {
        // 非登录状态
        setItem('TOUTIAO_CHANNELS', this.mychannel)
      }
    }
  },
  created () {
    this.loadAllChannels()
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      // 使用filter函数
      // 判断哪些channel在我的频道中已存在findIndex
      return this.allChannels.filter(item => {
        return this.mychannel.findIndex(myitem => {
          return myitem.id === item.id
        }) === -1
      })
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
    .title-text{
        font-size: 32px;
        color: #333333;
    }
    .edit-btn{
        width: 104px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
    }
    .channel-item {
        height: 86px;
        /deep/.van-grid-item__content{
            white-space: nowrap;
            background-color: #f5f5f6;
            .van-grid-item__text, .text{
                color: #222;
                font-size: 28px;
                margin-top: 0;
            }
            .active{
                color: #f85959
            }
            .van-grid-item__icon-wrapper{
                position: unset;
            }
            .van-icon-clear{
                position: absolute;
                top: -10px;
                right: -10px;
                font-size: 30px;
                color: #cacaca;
                z-index: 2;
            }
        }
    }
    /deep/.recommend-grid{
        .channel-item{
            .van-grid-item__content{
                flex-direction: row;
                .van-icon-plus{
                    font-size: 28px;
                    margin-right: 6px;
                }
                .van-grid-item__text{
                    margin-top: 0;
                }
            }
        }
    }
}
</style>
