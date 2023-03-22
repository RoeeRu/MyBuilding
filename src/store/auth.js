import { FirebaseConfig } from '../firebaseConfig';
import * as firebase from "firebase/app";
import { onAuthStateChanged , getAuth,signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import {handleSignIn,  isUserLoggedIn, resgiterNewApi } from '@/Api/user.js';
import {getPersonalInfo} from '@/Api/profile.js';
import jwt_decode from 'jwt-decode';
import router from './../router/index.js'


export default {
  state () {
    return {
      user: null,
      loggedIn: false
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
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
        console.log("state.loggedIn", state.loggedIn);
        return true;
      }
      FirebaseConfig.setup();
      const auth = getAuth();
      return new Promise(async (resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if(!user){
            dispatch('signOut')
            resolve(false);
            return;
          }
          unsubscribe();
          console.log("user", user);
          commit('setUser', user);
          const isLogged = await isUserLoggedIn(user.accessToken)
          if(!isLogged){
            dispatch('signOut')
            resolve(false);
            return false;
          }
          dispatch('setLoggedIn', true)
          resolve(true);
          return isLogged;
        }, reject);
      });
    },


    async handlePersonalInfo({state, commit, dispatch}) {
      let user = state.user;
      let userPersonalres = await getPersonalInfo(user.accessToken);
      if(!userPersonalres.status) {
        return false
      };
      user['building_id'] = userPersonalres.data.building_id;
      user['role'] = userPersonalres.data.role;
      commit('setUser', user);
      return true
    },

    async registrationHandler({state, commit, dispatch}, data) {
      FirebaseConfig.setup();
      const auth = getAuth();
      if(data.regType === 'selfRegistration') {
        return createUserWithEmailAndPassword(auth, data.email, data.password)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            commit('setUser', user);

            let isSignedIn = await resgiterNewApi(user);
            if(isSignedIn) {
              isSignedIn = await handleSignIn(state.user.accessToken);
            }

            dispatch('setLoggedIn', isSignedIn)
            await dispatch('handlePersonalInfo')
            return isSignedIn;
          })
          .catch((error) => {
            dispatch('setLoggedIn', false)
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('errorUemail', error);
            return false;
          });
      } else {
        let isSignedIn = await dispatch('signInWithPopup')
        if(isSignedIn) {
          isSignedIn = await handleSignIn(state.user.accessToken);
          await dispatch('handlePersonalInfo')
        }

        dispatch('setLoggedIn', isSignedIn)
        return isSignedIn;
      }
    },
    async loginHandler({state, commit, dispatch}, data) {
      FirebaseConfig.setup();
      const auth = getAuth();
      let isSignedIn;
      if(data.regType === 'selfRegistration') {
        return signInWithEmailAndPassword(auth, data.email, data.password)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            commit('setUser', user);
            dispatch('setLoggedIn', true)
            dispatch('logAnalytics')
            return true;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return false;
          });
      } else {
         let isSignedIn = await dispatch('signInWithPopup')
         if(isSignedIn) {
           isSignedIn = await handleSignIn(state.user.accessToken);
           await dispatch('handlePersonalInfo')
         }

         dispatch('setLoggedIn', isSignedIn)
         dispatch('logAnalytics')
         return isSignedIn;
      }
    },



    async signInWithPopup({state, commit}) {
      let provider = new GoogleAuthProvider();
      const auth = getAuth();
      return await signInWithPopup(auth, provider)
        .then(async (result) => {

          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          commit('setUser', user);
          return true;

        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log("errorMessage", errorMessage);
          return false;
        });
    },

    async signOut({state, commit, dispatch}) {
      FirebaseConfig.setup();
      const auth = await getAuth();
      return auth.signOut().then(function() {
        commit('setUser', null);
        dispatch('setLoggedIn', false)
        return true;
      }, function(error) {
        dispatch('setLoggedIn', false);
        return false;
        console.error('Sign Out Error', error);
      });
    },

    logAnalytics({state}) {
      analytics.identify("userId", {
        "id": state.user['email'],
        "company_id": state.user['building_id'],
        "email": state.user['email'],
        "name": state.user['displayName'],
      });
    }

  }
}
