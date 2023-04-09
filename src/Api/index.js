import axios from 'axios';
import router from './../router/index.js'
import store from '@/store'

axios.defaults.withCredentials = true;




const instance = axios.create({
  baseURL: process.env.VUE_APP_SYSTEM_DOMAIN, // set the base URL for all requests
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.response.use(async response => {
  return response;
}, async (error) => {
  if (error.response.status === 401) {
      await store.dispatch('signOut');
      if (router.currentRoute.name !== 'Sign-In') {
        router.currentRoute.meta.navigationCancelled = true;
        router.go('Sign-In');
      }

      // ignore error?
      return Promise.resolve();
  }
  return Promise.reject(error);
});

export default instance
