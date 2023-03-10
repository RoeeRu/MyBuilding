import axios from 'axios';
axios.defaults.withCredentials = true;


export function getActions(idToken) {
  return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/action/getActions', {
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

export function addNewAction(idToken, newActionPayload) {
  console.log("newActionPayload", newActionPayload);
  return axios.post(process.env.VUE_APP_SYSTEM_DOMAIN + '/action/addAction', newActionPayload, {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  }).then(response => {
      console.log("response.data", response.data);
      return response.data;
   }).catch((e) => {
     console.error(e.message);
     return e.message;
  });
}

export function deleteAction(idToken, ActionPayload) {
  return axios.post(process.env.VUE_APP_SYSTEM_DOMAIN + '/action/deleteAction',ActionPayload, {
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

export function updateAction(idToken, ActionPayload) {
  return axios.post(process.env.VUE_APP_SYSTEM_DOMAIN + '/action/updateAction', ActionPayload, {
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
