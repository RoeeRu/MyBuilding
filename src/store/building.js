import { FirebaseConfig } from '../firebaseConfig';
import * as firebase from "firebase/app";
import { getBuildingInfo, getBuildingMembers } from '@/Api/building.js';
import 'firebase/auth';


export default {
  namespaced: true,
  state () {
    return {
      buildingInfo: {},
      membersInfo: {},
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
      console.log("getBuildingInformation")
      let res = await getBuildingInfo(rootState.auth.user.accessToken);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('buildingInfo', res.data);
      console.log("res", res);
    },

    async getMembersInformation({ state, rootState, commit }) {
      console.log("getMembersInformation")
      let res = await getBuildingMembers(rootState.auth.user.accessToken);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('membersInfo', res.data);
      console.log("res", res);
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
