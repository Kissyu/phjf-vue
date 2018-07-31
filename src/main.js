// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import Es6Promise from 'es6-promise'
import ElementUI from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
import  'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import resetCss from './assets/zh/css/reset.css'
import AppCss from './assets/zh/css/app.css'

Vue.config.productionTip = false

require('es6-promise').polyfill()
Es6Promise.polyfill()

Vue.use(ElementUI)
Vue.use(infiniteScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
