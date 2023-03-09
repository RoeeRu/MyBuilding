import axios from 'axios';
axios.defaults.withCredentials = true;


export function getWidgetsData(idToken) {
  return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/dashboard/getWidgetsData', {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  }).then(response => {
      return response.data;
   }).catch((e) => {
     console.error(e.message); // "oh, no!"
     return e.message;
  });
}


export function getChartData(idToken) {
  return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/dashboard/getChartData', {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  }).then(response => {
      return response.data;
   }).catch((e) => {
     console.error(e.message); // "oh, no!"
     return e.message;
  });
}



