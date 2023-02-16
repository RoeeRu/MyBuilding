import { FirebaseConfig } from '../firebaseConfig';
import * as firebase from "firebase/app";
import { getPersonalInfo } from '@/Api/profile.js';
import 'firebase/auth';


export default {
  namespaced: true,
  state () {
    return {
      userInfo: {}
    }
  },
  mutations: {
    userInfo (state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
    async getUserData({ state, rootState, commit }) {
      let res = await getPersonalInfo(rootState.auth.user.accessToken);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('userInfo', res.data);
      console.log("res", res);
    },
  }
}
