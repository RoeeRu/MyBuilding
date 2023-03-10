import { getActions, addNewAction, deleteAction, updateAction } from '@/Api/actions.js';


export default {
  namespaced: true,
  state () {
    return {
      actions: []
    }
  },
  mutations: {
    actionsInfo (state, actions) {
      state.actions = actions
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
    }

  }
}
