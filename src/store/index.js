import Vue from 'vue'
import Vuex from 'vuex'
import { FirebaseConfig } from '../firebaseConfig';
import { onAuthStateChanged , getAuth  } from "firebase/auth";
import { isUserLoggedIn } from '@/Api/user.js';

// Create a new store instance.
Vue.use(Vuex);

const auth = {
  state () {
    return {
      loggedIn: false
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.loggedIn = value
    }
  },
  actions: {
    setLoggedIn({ commit }, value) {
      commit('SET_LOGGED_IN', value)
    },
    async isLoggedIn({ state, commit, dispatch }) {
      if(state.loggedIn) {
        return true;
      }
      await FirebaseConfig.setup();

      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch('setLoggedIn', true)
          const uid = user.uid;
          user.getIdToken().then(async (idToken) => {

            let res = await isUserLoggedIn(idToken);
            console.log('user logged? ' + res);
            }).catch((error) => {
                dispatch('setLoggedIn', false)
                console.log('store user not logged: ' + error.message);
            });
      } else {
          dispatch('setLoggedIn', false);
          console.log('user not logged');
        }
      });
      return state.loggedIn;
    }
  }
}


const store = new Vuex.Store({
  modules: {
    auth
  }
})

export default store
