import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './plugins/element.js'
import './styles/index'
import './components/index'

Vue.config.productionTip = false

Vue.filter('snippet', function (value) {
  return value.slice(0, 200) + ' ...'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
