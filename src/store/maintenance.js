import { getMaintenance, addNewMaintenance } from '@/Api/maintenance.js';


export default {
  namespaced: true,
  state () {
    return {
      maintenance: []
    }
  },
  mutations: {
    maintenanceInfo (state, maintenance) {
      state.maintenance = maintenance
    },
  },
  actions: {
    async getMaintenance({ state, rootState, commit }) {
      let res = await getMaintenance(rootState.auth.user.accessToken);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('maintenanceInfo', res.data);
    },
    async addMaintenance({ state, rootState, commit }, maintenancePayload) {
      let res = await addNewMaintenance(rootState.auth.user.accessToken, maintenancePayload);
      if(!res.status) {
        console.log("res.status faield", res.status);
        return false;
      }
      commit('maintenanceInfo', [...res.data, ...state.maintenance])
      return true;
    }


  }
}
