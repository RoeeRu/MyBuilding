import { getPersonalInfo, getPlaidLinkToken, exchangePublicToken, hasBankAccout, getAccountData } from '@/Api/profile.js';


export default {
  namespaced: true,
  state () {
    return {
      userInfo: {},
      hasBankAccout: false
    }
  },
  mutations: {
    userInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    hasBankAccout (state, hasBankAccout) {
      state.hasBankAccout = hasBankAccout
    }
  },
  actions: {
    async getUserData({ state, rootState, commit }) {
      let res = await getPersonalInfo(rootState.auth.user.accessToken);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('userInfo', res.data);
    },
    async getPlaidLinkToken({ state, rootState, commit }) {
      let res = await getPlaidLinkToken(rootState.auth.user.accessToken);
      if(!res) {
        return false;
      }
      return res.link_token;
    },

    async exchangePublicToken({ state, rootState, commit }, data ) {
      const res =  await exchangePublicToken(data.public_token, rootState.auth.user.accessToken);
      if(res.status) {
        commit('hasBankAccout', true);
        return res.data.accounts[0].balances;
      } else{
        commit('hasBankAccout', false);
        return [];
      }
    },

    async hasBankAccout({ state, rootState, commit }) {
      const res =  await hasBankAccout(rootState.auth.user.accessToken);
      if(res.status) {
        commit('hasBankAccout', res.hasBankAccout);
      } else {
        commit('hasBankAccout', false);
      }
    },

    async getAccountData({ state, rootState }) {
      const res =  await getAccountData(rootState.auth.user.accessToken);
      if(res.status) {
        return res.data.accounts[0].balances;
      } else {
        return false;
      }
    }

  }
}
