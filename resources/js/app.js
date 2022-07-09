import Vue from 'vue'
import router from './router.js'
import VueSocialSharing from 'vue-social-sharing';
import VueCompositionAPI from '@vue/composition-api'
import axios from 'axios'
import MainPage from './components/page/MainPage'


import 'bootstrap';

Vue.prototype.$http = axios;

axios.defaults.headers.common['Authorization'] = "Bearer " + document
  .querySelector('meta[name="api-token"]')
  .getAttribute("content");

Vue.prototype.$http = axios;

Vue.use(VueCompositionAPI)
Vue.use(VueSocialSharing);

new Vue({
  el: '#app',
  components: {
    app: MainPage
  },  
  router: router,
}).$mount('#app')

