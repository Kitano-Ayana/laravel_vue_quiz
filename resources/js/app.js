import Vue from 'vue'
import router from './router.js'
import SocialSharing from 'vue-social-sharing'
import VueCompositionAPI from '@vue/composition-api'
import axios from 'axios'

Vue.prototype.$http = axios;

Vue.use(VueCompositionAPI)
Vue.use(SocialSharing);

new Vue({
  el: '#app',
  router: router,
}).$mount('#app')
