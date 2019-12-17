<template>
  <div class="login-container">
    <el-row>
      <el-col :xs="24" :sm="{span: 20, offset: 2}" :md="{span: 10, offset: 7}" :lg="{span: 10, offset: 7}" :xl="{span: 10, offset: 7}">
        <div class="box">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            label-width="100px"
            label-position='left'
            class="login-form"
          >
            <el-page-header @back="goBack" style="margin-bottom: 20px;">
              <div slot="title">
                返回
              </div>
              <div class="text-primary" slot="content" style="margin-left: 5em; font-size: 25px;">
                登录
              </div>
            </el-page-header>
            <el-form-item prop="email" label="邮箱：">
                <el-input v-model="loginForm.email"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码：">
                <el-input v-model="loginForm.password" type="password"></el-input>
            </el-form-item>
            <el-button type="primary" native-type="submit" @click.prevent="login" :loading="loading">登录</el-button>
            <div class="login-info">还没有账号？请点击<router-link :to="{name: 'register'}">这里</router-link>注册</div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import UserService from '../../services/UserService'

export default {
  data () {
    return {
      loading: false,
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: {
          type: 'email',
          required: true,
          message: '请输入合法的邮箱',
          trigger: 'blur'
        },
        password: {
          type: 'string',
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    async login () {
      this.$refs['loginForm'].validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            const response = await UserService.login({
              email: this.loginForm.email,
              password: this.loginForm.password
            })
            if (response.code !== 200) {
              this.$message({
                type: 'error',
                duration: 2000,
                showClose: true,
                message: response.error
              })
              this.loading = false
            } else {
              this.$store.dispatch('setToken', response.token)
              this.$store.dispatch('setUser', response.user)
              if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect)
              } else {
                this.$router.push('/')
              }
              this.loading = false
            }
          } catch (error) {
            this.$message({
              type: 'error',
              duration: 2000,
              showClose: true,
              message: '连接服务器出错，请稍后重试。'
            })
            this.loading = false
          }
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: url(../../assets/bg.gif) repeat;
  .login-form {
    width: 430px;
    margin: 120px auto 0;
    position: relative;
    background: white;
    text-align: center;
    padding: 20px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    .mini-menu {
      text-align: left;
      display: block;
      i {
        text-align: left;
        font-size: 30px;
        transition: 0.6s;
        border-radius: 50%;
        &:hover {
          background: #909399;
        }
      }
    }
    .login-info {
      text-align: right;
      font-size: 0.9rem;
      margin-top: 10px;
      color: #909399;
    }
  }
}
</style>
