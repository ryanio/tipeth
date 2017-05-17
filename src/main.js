// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import AsyncComputed from 'vue-async-computed'

Vue.use(AsyncComputed)

// Mixins
import utilHelper from './helpers/util'
import web3Helper from './helpers/web3'

Vue.use(utilHelper)
Vue.use(web3Helper)

// Config
Vue.config.productionTip = false

// CSS
import '../node_modules/bulma/css/bulma.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import '../static/fonts/fonts.css'
import '../static/style/app.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
