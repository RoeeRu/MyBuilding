import { getActions } from '@/Api/actions.js';


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
    },


  }
}
