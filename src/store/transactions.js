import { getTransactions, addNewTransaction, deleteTransaction, updateTransaction } from '@/Api/transactions.js';

export default {
  namespaced: true,
  state () {
    return {
      transactions: [],
      originalTransactionsInfo: [],
      limit :15,
    }
  },
  mutations: {
    transactionsInfo (state, transactions) {
      state.transactions = transactions
    },
    originalTransactionsInfo (state, originalTransactions) {
      state.originalTransactionsInfo = originalTransactions
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
      commit('originalTransactionsInfo', res.data);
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
    },

    filterTransactionData({ state, rootState, commit }, search) {
      if (search.searchValue === '') {
          commit('transactionsInfo', state.originalTransactionsInfo);
      } else {
        const filteredTransactionsInfo =  state.originalTransactionsInfo.filter(row => {
          // Check if any property of the row contains the search value
          return Object.values(row).some(value => {
                if (typeof value === 'object') {
                    // Check if the object contains the search value
                    const stringifiedValue = JSON.stringify(value)
                    return stringifiedValue.toLowerCase().includes(search.searchValue.toLowerCase())
                } else {
                    return String(value).toLowerCase().includes(search.searchValue.toLowerCase())
                }
          })
        })
        commit('transactionsInfo', filteredTransactionsInfo);
      }
    }
  }
}
