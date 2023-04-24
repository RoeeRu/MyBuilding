import axios from './index.js'


export function getTopics(idToken) {
  return axios.get('/forum/getTopics', {
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


export function getThread(idToken, threadPayload) {
  return axios.post('/forum/getThread', threadPayload, {
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

export function addNewTopic(idToken, newTopicPayload) {
  return axios.post('/forum/addTopic', newTopicPayload, {
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

export function addNewResponse(idToken, newResponsePayload) {
  return axios.post('/forum/addResponse', newResponsePayload, {
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

export function deleteResponse(idToken, responsePayload) {
  return axios.post('/forum/deleteResponse', responsePayload, {
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



export function deleteTopic(idToken, TopicPayload) {
  return axios.post('/forum/deleteTopic',TopicPayload, {
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

export function updateTopic(idToken, TopicPayload) {
  return axios.post('/forum/updateTopic', TopicPayload, {
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
