import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import Swal from 'sweetalert2'
import './filters/index'
import VueProgressBar from 'vue-progressbar'

Vue.config.productionTip = false

// Setting up axios.
Vue.prototype.$axios = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$axios.defaults.headers.common['Authorization'] = "Bearer " + token
}

// Setting up SweetAlert 2
Vue.prototype.$Swal = Swal
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
Vue.prototype.$Toast = Toast

// setting up vue progress bar.
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
