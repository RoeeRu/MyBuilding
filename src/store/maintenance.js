import { getMaintenance, addNewMaintenance, updateMaintenance, deleteMaintenance } from '@/Api/maintenance.js';


export default {
  namespaced: true,
  state () {
    return {
      maintenance: [],
      originalMaintenance: []
    }
  },
  mutations: {
    maintenanceInfo (state, maintenance) {
      state.maintenance = maintenance
    },
    originalMaintenanceInfo (state, originalMaintenance) {
      state.originalMaintenance = originalMaintenance
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
      commit('originalMaintenanceInfo', res.data);
    },

    async addMaintenance({ state, rootState, commit }, maintenancePayload) {
      let res = await addNewMaintenance(rootState.auth.user.accessToken, maintenancePayload);
      if(!res.status) {
        console.log("res.status faield", res.status);
        return false;
      }
      commit('maintenanceInfo', [...res.data, ...state.maintenance])
      return true;
    },

    async deleteMaintenance({ state, rootState, commit }, maintenancePayload) {
      let res = await deleteMaintenance(rootState.auth.user.accessToken, maintenancePayload);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('maintenanceInfo', res.data);
    },

    async updateMaintenance({ state, rootState, commit }, maintenancePayload) {
      let res = await updateMaintenance(rootState.auth.user.accessToken, maintenancePayload);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('maintenanceInfo', res.data);
      return true;
    },
    filterMaintenanceData({ state, rootState, commit }, search) {
      if (search.searchValue === '') {
          commit('maintenanceInfo', state.originalMaintenance);
      } else {
        const filteredMaintenance =  state.originalMaintenance.filter(row => {
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
        commit('maintenanceInfo', filteredMaintenance);
      }
    }

  }
}
