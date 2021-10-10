import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { savePolicy,getPolicies } from '../src/storage'

Vue.config.productionTip = false
Vue.prototype.$savePolicy = savePolicy;
Vue.prototype.$getPolicies = getPolicies;


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
