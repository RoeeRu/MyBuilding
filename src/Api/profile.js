import axios from './index.js'

export function getPersonalInfo(idToken) {
    return axios.get('/profile/getPersonalInfo', {
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
