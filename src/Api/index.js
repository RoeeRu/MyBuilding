import axios from 'axios';
import router from './../router/index.js'
import store from '@/store'

axios.defaults.withCredentials = true;
console.log("withCredentials")




const instance = axios.create({
  baseURL: process.env.VUE_APP_SYSTEM_DOMAIN, // set the base URL for all requests
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.response.use(response => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
      store.dispatch('setLoggedIn', false);
      if (router.currentRoute.name !== 'Sign-In') {
        router.push({ name: 'Sign-In' });
      }

      // ignore error?
      return Promise.resolve();
  }
  return Promise.reject(error);
});

export default instance
