import axios from 'axios';
axios.defaults.withCredentials = true;


export function getTransactions(idToken) {
  return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/transactions/getTransactions', {
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
