import { getDeliveries, addNewDelivery, deleteDelivery, updateDelivery } from '@/Api/deliveries.js';


export default {
  namespaced: true,
  state () {
    return {
      deliveries: [],
      originalDeliveries: []
    }
  },
  mutations: {
    deliveriesInfo (state, deliveries) {
      state.deliveries = deliveries
    },
    originalDeliveriesInfo (state, originalDeliveries) {
      state.originalDeliveries = originalDeliveries
    }
  },
  actions: {
    async getDeliveries({ state, rootState, commit }) {
      let res = await getDeliveries(rootState.auth.user.accessToken);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('deliveriesInfo', res.data);
      commit('originalDeliveriesInfo', res.data);
    },
    async addDelivery({ state, rootState, commit }, actionPayload) {
      let res = await addNewDelivery(rootState.auth.user.accessToken, actionPayload);
      if(!res.status) {
        console.log("res.status faield", res.status);
        return false;
      }
      commit('deliveriesInfo', [...res.data, ...state.deliveries])
      return true;
    },

    async deleteDelivery({ state, rootState, commit }, actionPayload) {
      let res = await deleteDelivery(rootState.auth.user.accessToken, actionPayload);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('deliveriesInfo', res.data);
    },

    async updateDelivery({ state, rootState, commit }, actionPayload) {
      console.log("actionPayload", actionPayload);
      let res = await updateDelivery(rootState.auth.user.accessToken, actionPayload);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('deliveriesInfo', res.data);
      return true;
    },

    filterDeliveryData({ state, rootState, commit }, search) {
      if (search.searchValue === '') {
          commit('deliveriesInfo', state.originalDeliveries);
      } else {
        const filteredDeliveries =  state.originalDeliveries.filter(row => {
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
        commit('deliveriesInfo', filteredDeliveries);
      }
    }

  }
}
