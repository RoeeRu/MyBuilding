import { getPersonalInfo } from '@/Api/profile.js';


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
    }
  },
  actions: {
    async getUserData({ state, rootState, commit }) {
      let res = await getPersonalInfo(rootState.auth.user.accessToken);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('userInfo', res.data);
    }

  }
}
