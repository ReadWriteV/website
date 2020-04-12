import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import { Notification } from 'element-ui'

Vue.use(Router)

const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: {
        name: 'main'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/layout/Home.vue'),
      redirect: {
        name: 'main'
      },
      children: [
        {
          path: 'main',
          name: 'main',
          component: () => import('./views/layout/Main.vue')
        },
        {
          path: 'epidemicMap',
          name: 'epidemicMap',
          component: () => import('./views/layout/EpidemicMap.vue')
        },
        {
          path: 'blog',
          name: 'blog',
          component: () => import('./views/layout/Blog.vue')
        },
        {
          path: 'blog/:id',
          name: 'blogDetail',
          component: () => import('./views/layout/BlogDetail.vue')
        },
        {
          path: 'download',
          name: 'download',
          component: () => import('./views/layout/Download.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: 'note',
          name: 'note',
          component: () => import('./views/layout/Note.vue')
        }
      ]
    },
    {
      path: '/black',
      name: 'black',
      component: () => import('./views/Black.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/user/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/user/Login.vue')
    },
    {
      path: '*',
      redirect: {
        name: 'black'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((router) => router.meta.auth)) {
    if (store.state.isUserLogin) {
      next()
    } else {
      Notification({
        title: 'Tips',
        type: 'warning',
        message: '请先登录再访问此页面'
      })
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
  next()
})

export default router
