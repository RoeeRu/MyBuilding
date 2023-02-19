import axios from 'axios';
axios.defaults.withCredentials = true;

export function getPersonalInfo(idToken) {
    return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/profile/getPersonalInfo', {
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

export function getPlaidLinkToken(idToken) {
    return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/profile/plaidLinkToken', {
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
    console.log("publicToken", publicToken);
    return axios.post(process.env.VUE_APP_SYSTEM_DOMAIN + '/profile/getNewAccountData', {publicToken}, {
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
    return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/profile/hasBankAccout', {
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
    return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/profile/getAccountData', {
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
