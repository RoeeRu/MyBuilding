import axios from 'axios';
axios.defaults.withCredentials = true;

 
export function getDocuments(idToken) {
  return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/documents/getDocuments', {
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

export function addNewDocument(idToken, newDocumentPayload) {
  return axios.post(process.env.VUE_APP_SYSTEM_DOMAIN + '/documents/addDocument', newDocumentPayload, {
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
