import axios from './index.js'


export function getDeliveries(idToken) {
  return axios.get('/delivery/getDeliveries', {
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

export function addNewDelivery(idToken, newDeliveryPayload) {
  return axios.post('/delivery/addDelivery', newDeliveryPayload, {
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

export function deleteDelivery(idToken, DeliveryPayload) {
  return axios.post('/delivery/deleteDelivery',DeliveryPayload, {
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

export function updateDelivery(idToken, DeliveryPayload) {
  return axios.post('/delivery/updateDelivery', DeliveryPayload, {
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
