import axios from 'axios';
axios.defaults.withCredentials = true;


export function resgiterNewApi(user) {
    return axios.post(process.env.VUE_APP_SYSTEM_DOMAIN + '/registration/new', {accessToken: user.accessToken})
      .then(response => {
        console.log(response.data.data);
        return response.data.status;
     });
}

export function isUserLoggedIn(token) {
  return axios.post(process.env.VUE_APP_SYSTEM_DOMAIN + '/registration/isSignedIn', {accessToken: token})
    .then(response => {
      console.log(response.data.status);
      return response.data.status;
   });
}
