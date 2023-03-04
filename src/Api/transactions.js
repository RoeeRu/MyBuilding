import axios from 'axios';
axios.defaults.withCredentials = true;


export function getTransactions(idToken, limit = 20) {
  return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/transactions/getTransactions', {
    headers: {
      Authorization: `Bearer ${idToken}`,
      
    },
    params: {Limit: limit}
  }).then(response => {
      return response.data;
   }).catch((e) => {
     console.error(e.message);
     return e.message;
  });
}
