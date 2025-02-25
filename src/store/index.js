import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import profile from './profile'
import building from './building'
import actions from './actions'
import maintenance from './maintenance'
import transactions from './transactions'
import dashboard from './dashboard'
import documents from './documents'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    profile,
    building,
    actions,
    maintenance,
    transactions,
    dashboard,
    documents,
  }
})
