import axios from './index.js'


export function getWidgetsData(idToken) {
  return axios.get('/dashboard/getWidgetsData', {
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
  return axios.get('/dashboard/getChartData', {
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
