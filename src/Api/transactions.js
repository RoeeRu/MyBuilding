import axios from 'axios';
axios.defaults.withCredentials = true;


export function getTransactions(idToken, limit) {
  return axios.get(process.env.VUE_APP_SYSTEM_DOMAIN + '/transactions/getTransactions', {
    headers: {
      Authorization: `Bearer ${idToken}`,
      
    },
    params: {Limit: limit}
  }).then(response => {
      return response.data;
   }).catch((e) => {
     console.error(e.message);
     return e.message;
  });
}


export function addNewTransaction(idToken, newTransactionPayload) {
  console.log("newTransactionPayload", newTransactionPayload);
  return axios.post(process.env.VUE_APP_SYSTEM_DOMAIN + '/transactions/addTransaction', newTransactionPayload, {
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

export function deleteTransaction(idToken, TransactionPayload) {
  return axios.post(process.env.VUE_APP_SYSTEM_DOMAIN + '/transactions/deleteTransaction',TransactionPayload, {
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

export function updateTransaction(idToken, TransactionPayload) {
  return axios.post(process.env.VUE_APP_SYSTEM_DOMAIN + '/transactions/updateTransaction', TransactionPayload, {
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
