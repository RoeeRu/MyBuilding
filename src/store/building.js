import { getBuildingInfo, getBuildingMembers } from '@/Api/building.js';


export default {
  namespaced: true,
  state () {
    return {
      buildingInfo: {},
      membersInfo: [],
      hasBankAccout: false
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

    async hasBankAccout({ state, rootState, commit }) {
      const res =  await hasBankAccout(rootState.auth.user.accessToken);
      if(res.status) {
        commit('hasBankAccout', res.hasBankAccout);
      } else {
        commit('hasBankAccout', false);
      }
    },

  }
}
