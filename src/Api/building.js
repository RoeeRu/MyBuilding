import axios from 'axios';
axios.defaults.withCredentials = true;

export function getBuildingInfo(idToken) {
    return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/building/getBuildingInfo', {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    }).then(response => {
        console.log("res.res", response.data.data);
        return response.data;
     }).catch((e) => {
       console.error(e.message); // "oh, no!"
       return e.message;
    });
}

export function getBuildingMembers(idToken) {
  return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/building/getBuildingMembers', {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  }).then(response => {
      console.log("res.res", response.data.data);
      return response.data;
   }).catch((e) => {
     console.error(e.message); // "oh, no!"
     return e.message;
  });
}