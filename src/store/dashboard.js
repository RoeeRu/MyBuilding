import { getWidgetsData } from '@/Api/dashboard.js';
import { getMaintenance } from '@/Api/maintenance.js';
import { getActions } from '@/Api/actions.js';

export default {
    namespaced: true,
    state () {
        return {
            widgetsInfo: [],
            projectsInfo: [],
        }
    },
    mutations: {
        widgetsInfo (state, widgetsInfo) {
            state.widgetsInfo = widgetsInfo
        },
        projectsInfo (state, projectsInfo) {
            state.projectsInfo = projectsInfo
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
                console.log("faield", res.data);
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
            let actionsToPrint = Math.min(actionsNum, Math.max(2, 4-maintenanceNum));
            let maintenanceToPrint = Math.min(maintenanceNum, Math.max(2, 4-actionsToPrint));
            let result = [];
            let counter = 1;
            for (let i = 0; i < actionsToPrint; i++) {
                let project = {
                    id: counter++,
                    title: actionsRes.data[i]['item'],
                    content: actionsRes.data[i]['details'],
                    cover: "images/home-decor-3.jpeg",
                    button: "View Action Items",
                    link: "/actions",
                    
                }
                result.push(project);
            }
            for (let i = 0; i < maintenanceToPrint; i++) {
                let project = {
                    id: counter++,
                    title: maintenanceRes.data[i]['issue'],
                    content: maintenanceRes.data[i]['details'],
                    cover: "images/home-decor-3.jpeg",
                    button: "View Maintenance Requests",
                    link: "/maintenance",
                    
                }
                result.push(project);
            }
            
            commit('projectsInfo', result);
        }
    }
}
