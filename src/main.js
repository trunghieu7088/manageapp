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

import ToastMessage from './components/layout/ToastMessage.vue'

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = 'http://localhost:8000/';

//axios.defaults.baseURL = 'https://manage.hieubinh.com/';

const app = createApp(App)

app.use(createPinia())


app.use(router)

app.use(PrimeVue)

app.use(ToastService)

app.component('ToastMessage', ToastMessage)

app.mount('#app')


