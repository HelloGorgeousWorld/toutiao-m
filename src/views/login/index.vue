<template>
  <div class="login-container">
      <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="标题"
      >
      <van-icon slot="left" name="cross" @click="$router.back()"/>
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
        <van-field
            v-model="user.mobile"
            name="mobile"
            placeholder="请输入手机号"
            :rules="userFormRules.mobile"
            type="number"
            maxlength="11"
        >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field
            v-model="user.code"
            name="code"
            placeholder="请输入验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
            type="number"
            maxlength="6"
        >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
            <van-count-down
              v-if="isCountDownShow"
              :time="1000 * 60"
              format="ss s"
              @finish="isCountDownShow = false"
            />
            <van-button
              v-else
              class="send-sms-btn"
              round
              native-type="button"
              size="small"
              type="default"
              @click="onSendSms"
              >获取验证码</van-button>
        </template>
        </van-field>
        <div class="login-btn-wrap">
            <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
        </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        },
        {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        },
        {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }
        ]
      },
      isCountDownShow: false// 默认不显示
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit (values) {
      // 1.获取表单数据
      const user = this.user

      // 2.表单验证
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁用背景点击
        duration: 1
      })
      // 3.提交表单请求登录
      try {
        const res = await login(user)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
      // 4.根据请求响应结果处理后续的操作
    },
    async onSendSms () {
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2.校验通过，倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast('请求太频繁了，请稍后再试')
        } else {
          this.$toast('发送验证码失败！')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
    .login-container {
        .toutiao {
            font-size: 37px;
        }
        .send-sms-btn {
            width: 156px;
            height: 46px;
            line-height: 46px;
            background-color: #ededed;
            font-size: 22px;
            color: #666
        }
        .login-btn-wrap{
          padding: 52px 33px;
          .login-btn{
            background-color: #6db4fb;
            border: none;
          }
        }
    }
</style>
