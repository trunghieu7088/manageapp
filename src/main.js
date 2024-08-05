import './assets/admin/plugins/fontawesome-free/css/all.min.css'
import './assets/admin/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import './assets/admin/dist/css/adminlte.min.css'

//import './assets/admin/plugins/jquery/jquery.min.js'
/*import jQuery from 'jquery';
const $ = jQuery;
window.$ = $;*/
//import './assets/admin/plugins/bootstrap/js/bootstrap.bundle.min.js'
//import './assets/admin/dist/js/adminlte.min.js'
//import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/aura-light-green/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import axios from "axios"
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ConfirmationService from 'primevue/confirmationservice';

import ToastMessage from './components/layout/ToastMessage.vue'
import ConfirmDialogPrime from './components/layout/ConfirmDialogPrime.vue'
import { userData } from '@/stores/authStore/authStore.js'


axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = 'http://localhost:8000/';
//axios.defaults.baseURL = 'https://manage.hieubinh.com/';

//add axios interceptors to handle exceptional error
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data    
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.status === 401) {
        // Handle unauthorized response
        const authStore = userData()        
        authStore.unsetUserData();
        router.push({ name: 'login' })
      }
    return Promise.reject(error);
  });



const app = createApp(App)

//app.use(createPinia())

app.use(router)

app.use(PrimeVue)

app.use(ToastService)

app.use(ConfirmationService)

app.component('ToastMessage', ToastMessage)

app.component('ConfirmDialogPrime', ConfirmDialogPrime)

app.use(createPinia())

app.mount('#app')


