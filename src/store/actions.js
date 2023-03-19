import { getActions, addNewAction, deleteAction, updateAction } from '@/Api/actions.js';


export default {
  namespaced: true,
  state () {
    return {
      actions: [],
      originalActions: []
    }
  },
  mutations: {
    actionsInfo (state, actions) {
      state.actions = actions
    },
    originalActionsInfo (state, originalActions) {
      state.originalActions = originalActions
    }
  },
  actions: {
    async getActions({ state, rootState, commit }) {
      let res = await getActions(rootState.auth.user.accessToken);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('actionsInfo', res.data);
      commit('originalActionsInfo', res.data);
    },
    async addAction({ state, rootState, commit }, actionPayload) {
      let res = await addNewAction(rootState.auth.user.accessToken, actionPayload);
      if(!res.status) {
        console.log("res.status faield", res.status);
        return false;
      }
      commit('actionsInfo', [...res.data, ...state.actions])
      return true;
    },

    async deleteAction({ state, rootState, commit }, actionPayload) {
      let res = await deleteAction(rootState.auth.user.accessToken, actionPayload);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('actionsInfo', res.data);
    },

    async updateAction({ state, rootState, commit }, actionPayload) {
      console.log("actionPayload", actionPayload);
      let res = await updateAction(rootState.auth.user.accessToken, actionPayload);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('actionsInfo', res.data);
      return true;
    },

    filterActionData({ state, rootState, commit }, search) {
      if (search.searchValue === '') {
          commit('actionsInfo', state.originalActions);
      } else {
        const filteredActions =  state.originalActions.filter(row => {
          // Check if any property of the row contains the search value
          return Object.values(row).some(value => {
                if (typeof value === 'object') {
                    // Check if the object contains the search value
                    const stringifiedValue = JSON.stringify(value)
                    return stringifiedValue.includes(search.searchValue)
                } else {
                    return String(value).toLowerCase().includes(search.searchValue.toLowerCase())
                }
          })
        })
        commit('actionsInfo', filteredActions);
      }
    }

  }
}
