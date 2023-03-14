import axios from 'axios';
axios.defaults.withCredentials = true;

export function getPersonalInfo(idToken) {
    return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/profile/getPersonalInfo', {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    }).then(response => {
        return response.data;
     }).catch((e) => {
       console.error(e.message);
       return e.message;
    });
}
