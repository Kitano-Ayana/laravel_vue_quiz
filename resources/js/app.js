import Vue from 'vue'
import router from './router.js'
import VueSocialSharing from 'vue-social-sharing';
import VueCompositionAPI from '@vue/composition-api'
import axios from 'axios'
Vue.prototype.$http = axios;
Vue.use(VueCompositionAPI)
Vue.use(VueSocialSharing);
new Vue({
  el: '#app',
  router: router,
}).$mount('#app')
