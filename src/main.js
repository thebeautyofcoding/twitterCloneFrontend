import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import './index.css'
import Pusher from "pusher-js"
import VueEcho from "vue-echo-laravel"
import Echo from "laravel-echo"
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

var token = localStorage.getItem('token')
import 'animate.css'
import VueToast from 'vue-toast-notification'
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css'
window.Pusher = require('pusher-js')
import axios from 'axios'
window.apiClient = axios.create({
  baseURL: `${process.env.VUE_APP_API_ENDPOINT}/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  }
})

window.Echo = new Echo({
  broadcaster: "pusher",
  key: "d4a3dfa359b90a39e1ed",
  broadcaster: 'pusher',

  authEndpoint: `${process.env.VUE_APP_API_ENDPOINT}/broadcasting/auth`,
  forceTLS: true,
  enycrypted: false,
  cluster: 'eu', transports: ['websocket', 'polling', 'flashsocket'],

  auth: {
    headers: {
      Authorization: "Bearer " + token,


    }
  }
})
createApp(App).use(store).use(router).use(window.Echo).use(VueToast).mount('#app')
