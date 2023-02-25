import { getTransactions } from '@/Api/transactions.js';


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
        console.log("faield", res.data);
        return false;
      }
      commit('transactionsInfo', res.data);
    }
  }
}
