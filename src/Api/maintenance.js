import axios from './index.js'


export function getMaintenance(idToken) {
  return axios.get('/maintenance/getMaintenance', {
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
  return axios.post('/maintenance/addMaintenance', newMaintenancePayload, {
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

export function deleteMaintenance(idToken, MaintenancePayload) {
  return axios.post('/maintenance/deleteMaintenance',MaintenancePayload, {
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

export function updateMaintenance(idToken, MaintenancePayload) {
  return axios.post('/maintenance/updateMaintenance', MaintenancePayload, {
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
