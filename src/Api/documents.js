import axios from './index.js'


export function getDocuments(idToken) {
  console.log("axios", axios);
  return axios.get('/documents/getDocuments', {
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
  return axios.post('/documents/addDocument', newDocumentPayload, {
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

export function deleteDocument(idToken, DocumentPayload) {
  return axios.post('/documents/deleteDocument',DocumentPayload, {
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

export function updateDocument(idToken, DocumentPayload) {
  return axios.post('/documents/updateDocument', DocumentPayload, {
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
