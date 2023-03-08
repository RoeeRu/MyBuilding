import { getWidgetsData } from '@/Api/dashboard.js';

export default {
    namespaced: true,
    state () {
        return {
            widgetsInfo: [],
        }
    },
    mutations: {
        widgetsInfo (state, widgetsInfo) {
            state.widgetsInfo = widgetsInfo
        },
    },
    actions: {
        async getWidgets({ state, rootState, commit }) {
            let res = await getWidgetsData(rootState.auth.user.accessToken);
            
            if(!res.status) {
                console.log("faield", res);
                return false;
            }
            commit('widgetsInfo', res.data);
        },
    }
}
