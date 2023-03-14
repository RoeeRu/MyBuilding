import { getBuildingInfo, getBuildingMembers, getPlaidLinkToken, exchangePublicToken, hasBankAccout, getAccountData } from '@/Api/building.js';


export default {
  namespaced: true,
  state () {
    return {
      buildingInfo: {},
      membersInfo: [],
      hasBankAccout: false,
      bankAccountDetails: {}
    }
  },
  mutations: {
    buildingInfo (state, buildingInfo) {
      state.buildingInfo = buildingInfo
    },
    membersInfo (state, membersInfo) {
      state.membersInfo = membersInfo
    },
    hasBankAccout (state, hasBankAccout) {
      state.hasBankAccout = hasBankAccout
    },
    bankAccountDetails (state, bankAccountDetails) {
      state.bankAccountDetails = bankAccountDetails
    }
  },
  actions: {
    async getBuildingInformation({ state, rootState, commit }) {
      let res = await getBuildingInfo(rootState.auth.user.accessToken);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('buildingInfo', res.data);
    },

    async getMembersInformation({ state, rootState, commit }) {
      let res = await getBuildingMembers(rootState.auth.user.accessToken);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('membersInfo', res.data);
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
        return res.data.accounts[0];
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
        return res.data;
      } else {
        return false;
      }
    }

  }
}
