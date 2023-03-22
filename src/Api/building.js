import axios from './index.js'


export function getPlaidLinkToken(idToken) {
    return axios.get('/building/plaidLinkToken', {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    }).then(response => {
        return response.data;
     }).catch((e) => {
       console.log("error: ", e.message);
       return false;
    });
}


export function exchangePublicToken(publicToken, idToken) {
    return axios.post('/building/getNewAccountData', {publicToken}, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    }).then(response => {
        return response.data;
     }).catch((e) => {
       console.log("error: ", e.message);
       return false;
    });
}

export function hasBankAccout(idToken) {
    return axios.get('/building/hasBankAccout', {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    }).then(response => {
        return response.data;
     }).catch((e) => {
       console.log("error: ", e.message);
       return false;
    });
}


export function getAccountData(idToken) {
    return axios.get('/building/getAccountData', {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    }).then(response => {
        return response.data;
     }).catch((e) => {
       console.log("error: ", e.message);
       return false;
    });
}

export function getBuildingInfo(idToken) {
    return axios.get('/building/getBuildingInfo', {
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

export function getBuildingMembers(idToken) {
  return axios.get('/building/getBuildingMembers', {
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
