import Vue from 'vue'
import Vuetify from 'vuetify'
import DaySpanVuetify from 'dayspan-vuetify'
import { getCalendar, replaceCalendar } from '@/Api/calendar.js';

import 'vuetify/dist/vuetify.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'dayspan-vuetify/dist/lib/dayspan-vuetify.min.css'

Vue.config.productionTip = false



Vue.use( DaySpanVuetify, {
    // options is vue definition, the resulting reactive component is stored in components as this.$dayspan or Vue.$dayspan
    data: {
      // data or computed to override
    },
    computed:{
    // computed to override
  },
    methods: {
      // methods to override
      getDefaultEventColor: () => '#5176d2'
    }
  });


export default {
  namespaced: true,
  state () {
    return {
      calendarEvents: [],
    }
  },
  mutations: {
    calendarInfo (state, calendarEvents) {
      state.calendarEvents = calendarEvents
    },
  },
  actions: {
    async getCalendar({ state, rootState, commit }, calendarPayload) {
      let res = await getCalendar(rootState.auth.user.accessToken, calendarPayload);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('calendarInfo', res.data);
    },
    async replaceCalendar({ state, rootState, commit }, calendarPayload) {
      let res = await replaceCalendar(rootState.auth.user.accessToken, calendarPayload);
      if(!res.status) {
        console.log("res.status faield", res.status);
        return false;
      }
      console.log('got new data', res.data)
      commit('calendarInfo', res.data)
      return true;
    }
  },
}