<template>
  <div class="my-container">
          <!-- 已登录头部 -->
      <div v-if="user" class="header user-info">
        <div class="base-info">
          <div class="left">
            <van-image
              class="avatar"
              fit="cover"
              round
              :src="userInfo.photo"
            />
            <span class="name">{{userInfo.name}}</span>
          </div>
          <div class="right">
            <van-button
             round
             size="mini"
            to="/user/profile"
            >编辑资料</van-button>
          </div>
        </div>
        <div class="data-stats">
          <div class="data-item">
            <span class="count">{{userInfo.art_count}}</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.follow_count}}</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.fans_count}}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.like_count}}</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
    <!-- 未登录头部 -->
      <div v-else class="header not-login">
        <div class="login-btn" @click="$router.push('/login')">
          <img class="mobile-img" src="~@/assets/mobile.png">
          <span class="text">登录 / 注册</span>
        </div>
      </div>

      <!-- 宫格导航 -->
      <van-grid class="grid-nav" :column-num="2" clickable>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" class="mb-9" is-link />
      <van-cell
        clickable
        title="退出登录"
        class="logout-cell"
        v-if="user"
        @click="onLogout"
        />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.loadUser()
    }
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          console.log('不确认退出')
        })
    },
    async loadUser () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-container{
  .header{
    height: 361px;
    background:url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .mobile-img{
        height: 132px;
        width: 132px;
        margin-bottom: 15px;
      };
      .text{
      font-size: 28px;
      color: #fff;
      }
    }
  }
  .user-info{
    .base-info{
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        display: flex;
        align-items: center;
        .avatar{
          width:132px;
          height: 132px;
          margin-right: 23px;
          border: 3px solid #fff;
        }
        .name{
          font-size: 30px;
          color:#fff;
        }
      }
    }
    .data-stats{
      height: 130px;
      display: flex;
      .data-item{
        height: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        .count{
          font-size: 36px;
        }
        .text{
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav{
    .grid-item{
      height: 141px;
      margin-bottom: 5px;
      i.toutiao{
      font-size: 45px;
      }
      span.text{
        font-size: 28px;
      }
      .toutiao-shoucang{
        color: #eb5253;
      }
      .toutiao-lishi{
        color: #ff9d1d;
      }
    }

  }
  .logout-cell{
    margin-top: 8px;
    text-align: center;
    color: red;
  }
}
</style>
