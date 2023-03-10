import axios from 'axios';
axios.defaults.withCredentials = true;

 
export function getMaintenance(idToken) {
  return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/maintenance/getMaintenance', {
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

export function addNewMaintenance(idToken, newMaintenancePayload) {
  return axios.post(process.env.VUE_APP_SYSTEM_DOMAIN + '/maintenance/addMaintenance', newMaintenancePayload, {
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

export function deleteMaintenance(idToken) {
  return axios.post(process.env.VUE_APP_SYSTEM_DOMAIN + '/maintenance/deleteMaintenance', {
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
