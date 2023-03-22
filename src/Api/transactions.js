import axios from './index.js'


export function getTransactions(idToken, limit) {
  return axios.get('/transactions/getTransactions', {
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
  return axios.post('/transactions/addTransaction', newTransactionPayload, {
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
  return axios.post('/transactions/deleteTransaction',TransactionPayload, {
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
  return axios.post('/transactions/updateTransaction', TransactionPayload, {
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
