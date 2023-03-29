import { getWidgetsData } from '@/Api/dashboard.js';
import { getChartData } from '@/Api/dashboard.js';
import { getMaintenance } from '@/Api/maintenance.js';
import { getActions } from '@/Api/actions.js';

export default {
    namespaced: true,
    state () {
        return {
            widgetsInfo: [],
            projectsInfo: [],
            chartInfo: {},
        }
    },
    mutations: {
        widgetsInfo (state, widgetsInfo) {
            state.widgetsInfo = widgetsInfo
        },
        projectsInfo (state, projectsInfo) {
            state.projectsInfo = projectsInfo
        },
        chartInfo (state, chartInfo) {
            state.chartInfo = chartInfo
        }
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

        async getProjects({ state, rootState, commit }) {
            let maintenanceRes = await getMaintenance(rootState.auth.user.accessToken);
            let actionsRes = await getActions(rootState.auth.user.accessToken);
            if(!maintenanceRes.status && !actionsRes.status) {
                console.log("no actions, no maintennace", res.data);
                return false;
            }
            let maintenanceNum = 0;
            if(maintenanceRes.status) {
                maintenanceNum = maintenanceRes.data.length;
            }
            let actionsNum = 0;
            if(actionsRes.status) {
                actionsNum = actionsRes.data.length;
            }
            let actionsToPrint = Math.min(actionsNum, Math.max(3, 4-maintenanceNum));
            let maintenanceToPrint = Math.min(maintenanceNum, Math.max(1, 4-actionsToPrint));
            let result = [];
            let counter = 1;
            let project = {}
            let i = 0;
            while ( result.length < actionsToPrint && i < actionsNum  ) {
                if(actionsRes.data[i]['status'] != 'Closed') {
                    project = {
                        id: counter++,
                        title: actionsRes.data[i]['item'],
                        content: actionsRes.data[i]['details'],
                        button: "View Projects",
                        link: "/projects",
                    }
                    result.push(project);
                }
                i++;

            }
            i = 0;
            while ( result.length < actionsToPrint+maintenanceToPrint && i < maintenanceNum  ) {
                if(maintenanceRes.data[i]['status'] != 'Closed') {
                    project = {
                        id: counter++,
                        title: maintenanceRes.data[i]['issue'],
                        content: maintenanceRes.data[i]['details'],
                        button: "View Maintenance Requests",
                        link: "/maintenance",
                    }
                    result.push(project);
                }
                i++;

            }

            commit('projectsInfo', result);
        },

        async getChart({ state, rootState, commit }) {
            let res = await getChartData(rootState.auth.user.accessToken);
            if(!res.status) {
                console.log("faield", res);
                commit('chartInfo', {data:[]});
                return false;
            }
            commit('chartInfo', res.data);
        }
    }
}
