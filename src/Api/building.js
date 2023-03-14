import axios from 'axios';
axios.defaults.withCredentials = true;


export function getPlaidLinkToken(idToken) {
    return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/building/plaidLinkToken', {
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
    return axios.post(process.env.VUE_APP_SYSTEM_DOMAIN + '/building/getNewAccountData', {publicToken}, {
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
    return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/building/hasBankAccout', {
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
    return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/building/getAccountData', {
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
    return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/building/getBuildingInfo', {
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
  return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/building/getBuildingMembers', {
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
