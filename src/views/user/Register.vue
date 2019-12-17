<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      label-width="100px"
      label-position='left'
      class="register-form"
    >
      <el-page-header @back="goBack" style="margin-bottom: 20px;">
        <div slot="title">
          返回
        </div>
        <div class="text-primary" slot="content" style="margin-left: 5em; font-size: 25px;">
          注册
        </div>
      </el-page-header>
      <el-form-item prop="email" label="邮箱：">
          <el-input v-model="registerForm.email"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码：">
          <el-input v-model="registerForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="comparePassword" label="确认密码：">
          <el-input v-model="registerForm.comparePassword" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" native-type="submit" @click.prevent="register" :loading="loading">注册</el-button>
      <div class="register-info">已经有账号了？请点击<router-link :to="{name: 'login'}">这里</router-link>登录</div>
    </el-form>
  </div>
</template>

<script>

import UserService from '../../services/UserService'

export default {
  data () {
    return {
      loading: false,
      registerForm: {
        email: '',
        password: '',
        comparePassword: ''
      },
      registerRules: {
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
        },
        comparePassword: {
          type: 'string',
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.registerForm.password) {
              callback(new Error('密码不一致'))
            } else {
              callback()
            }
          }
        }
      }
    }
  },
  methods: {
    register () {
      this.$refs['registerForm'].validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            const response = await UserService.register({
              email: this.registerForm.email,
              password: this.registerForm.password
            })
            if (response.code !== 200) {
              this.loading = false
              this.$message({
                type: 'error',
                duration: 2000,
                showClose: true,
                message: response.error
              })
            } else {
              this.$store.dispatch('setToken', response.data.token)
              this.$store.dispatch('setUser', response.data.user)
              this.$router.push('/')
              this.loading = false
            }
          } catch (error) {
            this.loading = false
            this.$message({
              type: 'error',
              duration: 2000,
              showClose: true,
              message: '连接服务器出错，请稍后重试。'
            })
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
.register-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: url(../../assets/bg.gif) repeat;
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
  .register-form {
    position: relative;
    width: 430px;
    margin: 120px auto 0;
    background: white;
    text-align: center;
    padding: 20px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    .register-info {
      text-align: right;
      font-size: 0.9rem;
      margin-top: 10px;
      color: #909399;
    }
  }
}
</style>
