// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import AsyncComputed from 'vue-async-computed'

Vue.use(VueResource)
Vue.use(AsyncComputed)

// Mixins
import utilMixin from './mixins/util'
import web3Mixin from './mixins/web3'
import historyMixin from './mixins/history'
import currencyMixin from './mixins/currency'

Vue.use(utilMixin)
Vue.use(web3Mixin)
Vue.use(historyMixin)
Vue.use(currencyMixin)

// Config
Vue.config.productionTip = false
Vue.http.options.credentials = false

// CSS
import '../node_modules/bulma/css/bulma.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import '../static/fonts/fonts.css'
import '../static/style/app.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
