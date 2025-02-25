import { getTransactions, addNewTransaction, deleteTransaction, updateTransaction } from '@/Api/transactions.js';

export default {
  namespaced: true,
  state () {
    return {
      transactions: [],
      limit :15,
    }
  },
  mutations: {
    transactionsInfo (state, transactions) {
      state.transactions = transactions
    },
  },
  actions: {
    async getTransactions({ state, rootState, commit }) {
      let res = await getTransactions(rootState.auth.user.accessToken, state.limit);
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
    },

    async deleteTransaction({ state, rootState, commit }, transactionPayload) {
      let res = await deleteTransaction(rootState.auth.user.accessToken, transactionPayload);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('transactionsInfo', res.data);
    },

    async updateTransaction({ state, rootState, commit }, transactionPayload) {
      let res = await updateTransaction(rootState.auth.user.accessToken, transactionPayload);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('transactionsInfo', res.data);
      return true;
    }


  }
}
