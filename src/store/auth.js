import { FirebaseConfig } from '../firebaseConfig';
import * as firebase from "firebase/app";
import { onAuthStateChanged , getAuth,signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { isUserLoggedIn, resgiterNewApi } from '@/Api/user.js';
import {getPersonalInfo} from '@/Api/profile.js';


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
      return new Promise(async (resolve, reject) => {
        if(state.loggedIn) {
          resolve(true);
          return;
        }
        await FirebaseConfig.setup();

        const auth = await getAuth();
        await onAuthStateChanged(auth, async (user) => {
            if (user) {
              const uid = user.uid;
              user.getIdToken().then(async (idToken) => {
                let res = await isUserLoggedIn(idToken);
                dispatch('setLoggedIn', res)
                let userPersonalres = await getPersonalInfo(idToken);
                if(!userPersonalres.status) {
                  console.log("faield getting userPersonalres", res.data);
                  return false;
                };
                user['building_id'] = userPersonalres.data.building_id;
                user['role'] = userPersonalres.data.role;
                commit('setUser', user);
                console.log('user logged isLoggedIn? ' + res);
                if (res) {
                  console.log(user);
                  analytics.identify("userId", {
                    "id": user['email'],
                    "company_id": user['building_id'],
                    "email": user['email'],
                    "name": user['displayName'],
                  });
                }
                resolve(res);
              }).catch((error) => {
                dispatch('setLoggedIn', false)
                console.log('store user not logged: ' + error.message);
                resolve(false);
              });
            } else {
              dispatch('setLoggedIn', false);
              console.log('user not logged');
              resolve(false);
            }
        });
      });
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
            dispatch('setLoggedIn', isSignedIn)
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
        return await dispatch('signInWithPopup')
      }
    },
    async loginHandler({state, commit, dispatch}, data) {
      FirebaseConfig.setup();
      const auth = getAuth();

      if(data.regType === 'selfRegistration') {
        return signInWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            commit('setUser', user);
            return true;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return false;
          });
      } else {
        return await dispatch('signInWithPopup')
      }
    },

    async signOut({state, commit, dispatch}) {
      const auth = getAuth();
      return auth.signOut().then(function() {
        commit('setUser', null);
        dispatch('setLoggedIn', false)
        return true;
      }, function(error) {
        return false;
        console.error('Sign Out Error', error);
      });
    },

    async signInWithPopup({state, commit}) {
      let provider = new GoogleAuthProvider();
      const auth = getAuth();

      return await signInWithPopup(auth, provider)
        .then((result) => {
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
          return errorMessage;
        });
    },

  }
}
