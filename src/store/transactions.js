import { getTransactions, addNewTransaction } from '@/Api/transactions.js';

export default {
  namespaced: true,
  state () {
    return {
      transactions: []
    }
  },
  mutations: {
    transactionsInfo (state, transactions) {
      state.transactions = transactions
    },
  },
  actions: {
    async getTransactions({ state, rootState, commit }) {
      let res = await getTransactions(rootState.auth.user.accessToken);
      if(!res.status) {
        console.log("faield", res);
        return false;
      }
      commit('transactionsInfo', res.data);
    },
    async addTransaction({ state, rootState, commit }, transactionPayload) {
      let res = await addNewTransaction(rootState.auth.user.accessToken, transactionPayload);
      if(!res.status) {
        return false;
      }
      commit('transactionsInfo', [...res.data, ...state.transactions])
      return true;
    }
  }
}
