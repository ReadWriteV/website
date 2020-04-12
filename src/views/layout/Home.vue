<template>
  <el-container>
    <el-header height="80px" class="bg-primary shadow" :class="{'hasFixed': needFixed == true}">
      <el-row>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
          <div style="margin: 10px 0 10px 0; cursor: pointer;" @click="$router.push({name: 'index'})">
              <el-image
                style="height: 60px;"
                :src="url"
                fit="scale-down"
              ></el-image>
          </div>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
          <div class="nav-item">
            <router-link class="no-underline" :to="{name: 'main'}">首页</router-link>
          </div>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
          <div class="nav-item">
            <router-link class="no-underline" :to="{name: 'epidemicMap'}">疫情地图</router-link>
          </div>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
          <div class="nav-item">
            <router-link class="no-underline" :to="{name: 'blog'}">博客</router-link>
          </div>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
          <div class="nav-item">
            <router-link class="no-underline" :to="{name: 'download'}">下载</router-link>
          </div>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
          <div class="nav-item">
            <router-link class="no-underline" :to="{name: 'note'}">日志</router-link>
          </div>
        </el-col>
        <el-col :xs="0" :sm="{span: 4}" :md="{span: 3, offset: 1}" :lg="{span: 3, offset: 3}" :xl="{span: 3, offset: 3}">
          <div class="hello">
            <span class="text-white">{{ this.hello }}</span>
          </div>
        </el-col>
        <el-col :xs="{span: 8, offset: 1}" :sm="5" :md="5" :lg="3" :xl="3">
          <div class="text-white user">
            <template v-if="!$store.state.isUserLogin">
              <router-link class="text-white no-underline" :to="{name: 'login'}">登录</router-link>
              &nbsp;|&nbsp;
              <router-link class="text-white no-underline" :to="{name: 'register'}">注册</router-link>
            </template>
            <el-dropdown @command="handleCommand" v-else>
              <span class="el-dropdown-link text-white"><i class="el-icon-s-tools"></i>设置</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="profie">个人资料</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <div class="sideDir hidden-sm-and-down">
        <div class="option" :class="{'hide': needHide == true}">
          <i class="el-icon-arrow-up" @click="GoToTop"></i>
          <div class="text" @click="GoToTop">回到顶部</div>
        </div>
        <div class="option">
          <i class="el-icon-s-home" @click="GoToHome"></i>
          <div class="text" @click="GoToHome">返回首页</div>
        </div>
        <div class="option">
          <i class="el-icon-message" @click="Mail"></i>
          <div class="text" @click="Mail">反馈</div>
        </div>
      </div>
    </el-main>
    <el-footer class="bg-info">
      <el-row>
        <el-col :xs="0" :sm="1" :md="2" :lg="{span: 2, offset: 1}" :xl="{span: 2, offset: 2}">
          <div class="icon-box">
            <i class="el-icon-star-on" title="I Like It"></i>
          </div>
        </el-col>
        <el-col :xs="0" :sm="1" :md="2" :lg="2" :xl="2">
          <div class="icon-box">
            <i class="el-icon-view" title="100"></i>
          </div>
        </el-col>
        <el-col :xs="0" :sm="1" :md="2" :lg="2" :xl="2">
          <div class="icon-box">
            <i class="el-icon-refresh" title="update in 2019-10-8"></i>
          </div>
        </el-col>
        <el-col :xs="0" :sm="2" :md="3" :lg="3" :xl="3">
          <div class="icon-box">
            <el-image
              src="/cgi-bin/Count.cgi?df=wr666.dat&ft=0&tr=N&dd=D&md=5&pad=N"
              fit="cover"
              title="总访问次数"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-col>
        <el-col :xs="24" :sm="19" :md="{span: 13, offset: 1}" :lg="{span: 12, offset: 2}" :xl="{span: 11, offset: 2}">
          <div class="link">
            <span>相关链接：</span>
            <el-link type="primary" href="http://home.ustc.edu.cn" target="_blank">USTC学生主页服务器</el-link>
            <el-link type="success" href="https://cn.vuejs.org" target="_blank">Vue.js</el-link>
            <el-link type="primary" href="https://element.eleme.cn" target="_blank">Element</el-link>
            <el-link type="warning" href="https://lswhw.ustc.edu.cn" target="_blank">USTC历史文化网</el-link>
            <el-link type="success" href="https://github.com/ReadWriteV" target="_blank">GitHub</el-link>
          </div>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      needFixed: false,
      needHide: true,
      scroll: 0,
      url: require('../../assets/logo.png'),
      hello: ''
    }
  },
  created () {
    let date = new Date()
    if (date.getHours() >= 0 && date.getHours() < 11) {
      this.hello = '早上好！'
    } else if (date.getHours() >= 11 && date.getHours() < 13) {
      this.hello = '中午好！'
    } else if (date.getHours() >= 13 && date.getHours() < 18) {
      this.hello = '下午好！'
    } else {
      this.hello = '晚上好！'
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions([
      'setUser',
      'setToken'
    ]),
    handleScroll () {
      let self = this
      let newScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (newScroll > 175) {
        self.needHide = false
      } else {
        self.needHide = true
      }
      if (newScroll < self.scroll) {
        if (newScroll > 175) {
          self.needFixed = true
        } else {
          self.needFixed = false
        }
      } else {
        self.needFixed = false
      }
      self.scroll = newScroll
    },
    handleCommand (routeName) {
      if (routeName === 'logout') {
        this.logout()
      } else {
        this.$router.push({ name: routeName })
      }
    },
    logout () {
      this.setUser(null)
      this.setToken('')
      this.$router.push({ name: 'index' })
    },
    GoToTop  () {
      let top = document.documentElement.scrollTop
      let step = Math.floor(top / 5)
      let timer = null
      timer = setInterval(() => {
        if (top <= 0) {
          clearInterval(timer)
        } else {
          top -= step
          document.documentElement.scrollTop = top
          step = Math.floor(step / 2)
          if (step <= 5) {
            step = 5
          }
        }
      }, 5)
    },
    GoToHome () {
      this.$router.push('/')
    },
    Mail () {
      document.location = 'mailto:wr666@mail.ustc.edu.cn'
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
.hasFixed {
  width: 100%;
  position: fixed;
  background-color: rgba(64, 158, 255, 0.8);
  top: 0px;
  z-index: 1000;
}
.hide {
  opacity: 0;
  height: 0;
}
.no-underline {
  text-decoration: none;
}
.shadow {
  box-shadow: 0 2px 10px rgb(119, 119, 119);
}
.nav-item {
  padding: 25px 0 25px 0;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  .router-link-active {
    color: #fff;
  }
  a {
    color: #b6c1ff;
  }
  &:hover {
    background: rgb(43, 121, 199);
  }
  &:hover {
    a {
      color: #fff;
    }
  }
}
.hello {
  margin: 25px 0 25px 0;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  margin-left: auto;
}
.user {
  margin: 25px 0 25px 0;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
}
.sideDir {
  position: fixed;
  top: 60%;
  z-index: 999;
  right: 0;
  box-shadow: 0 0 10px rgb(119, 119, 119);
  .option
  {
    transition: 1s;
    cursor: pointer;
    position: relative;
    i {
      display: block;
      width: 60px;
      text-align: center;
      height: 60px;
      line-height: 60px;
      background:rgba(93, 220, 236, 0.1);
      color: rgb(8, 134, 238);
      font-size: 25px;
      transition: 0.6s;
    }
    .text
    {
      position: absolute;
      height: 60px;
      width: 150px;
      background: rgba(0, 107, 156, 0.4);
      top: 0;
      z-index: -1;
      right: -200px;
      color: #000;
      line-height: 60px;
      text-align: center;
      transition: 0.6s;
    }
    &:hover i{
      background: #b9b9b9;
      font-size: 30px;
      color: #fff;
    }
    &:hover .text {
      right: 60px;
    }
  }
}
.icon-box {
  text-align: center;
  margin-top: 20px;
  i {
    font-size: 25px;
    transition: 0.6s;
    background: #a5a5a5;
    border-radius: 50%;
  }
  &:hover {
    i {
      font-size: 30px;
    }
  }
}
.link {
  text-align: left;
  font-size: 16px;
  margin-top: 20px;
  .el-link {
    font-size: 16px;
    margin: 0 5px;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
