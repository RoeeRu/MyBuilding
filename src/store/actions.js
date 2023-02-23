import { FirebaseConfig } from '../firebaseConfig';
import * as firebase from "firebase/app";
import { getActions } from '@/Api/actions.js';
import 'firebase/auth';


export default {
  namespaced: true,
  state () {
    return {
      actionsInfo: []
    }
  },
  mutations: {
    actionsInfo (state, actionsInfo) {
      state.actionsInfo = actionsInfo
    },
  },
  actions: {
    async getActions({ state, rootState, commit }) {
      let res = await getActions(rootState.auth.user.accessToken);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('actionsInfo', res.data);
      console.log("res", res);
    },
    

  }
}
