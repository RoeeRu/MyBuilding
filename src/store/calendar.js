import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'dayspan-vuetify/dist/lib/dayspan-vuetify.min.css'
import DaySpanVuetify from 'dayspan-vuetify'
import Vue from 'vue'


Vue.use( DaySpanVuetify, {
    // options is vue definition, the resulting reactive component is stored in components as this.$dayspan or Vue.$dayspan
    data: {
      // data or computed to override
    },
    computed:
  {
    fullscreenPopovers()
    {
      return this.$vuetify.breakpoint.xl;
    },

    fullscreenDialogs()
    {
      return this.$vuetify.breakpoint.xl;
    }
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
            events: [],
        }
    }
}