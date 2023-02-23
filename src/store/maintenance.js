import { FirebaseConfig } from '../firebaseConfig';
import * as firebase from "firebase/app";
import { getMaintenance } from '@/Api/maintenance.js';
import 'firebase/auth';


export default {
  namespaced: true,
  state () {
    return {
      maintenanceInfo: []
    }
  },
  mutations: {
    maintenanceInfo (state, maintenanceInfo) {
      state.maintenanceInfo = maintenanceInfo
    },
  },
  actions: {
    async getMaintenance({ state, rootState, commit }) {
      console.log("getMaintenance");
      let res = await getMaintenance(rootState.auth.user.accessToken);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('maintenanceInfo', res.data);
      console.log("res", res);
    },
    

  }
}
