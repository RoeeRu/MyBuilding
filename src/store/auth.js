import { FirebaseConfig } from '../firebaseConfig';
import * as firebase from "firebase/app";
import { onAuthStateChanged , getAuth,signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import {handleSignIn,  isUserLoggedIn, resgiterNewApi } from '@/Api/user.js';
import {getPersonalInfo} from '@/Api/profile.js';
import jwt_decode from 'jwt-decode';
import router from './../router/index.js'
import {fetchAllowedRolesForRoutes } from '@/Api/user.js';


export default {
  state () {
    return {
      user: null,
      loggedIn: false,
      routesByRole: [],
      allowedRolesUpdated: false,
      roleName: null,
      initialRoute: '',
      loginRoutes: ['dashboard', 'calendar', 'maintenance', 'projects', 'transactions', 'building', 'documents',
                     'deliveries', 'services', 'forum'],
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    SET_LOGGED_IN(state, value) {
      state.loggedIn = value
    },
    SET_ROUTES(state, routesByRole) {
      state.routesByRole = routesByRole
    },
    SET_ALLOW_ROLE_UPDATE(state, isUpdated) {
      state.allowedRolesUpdated = isUpdated
    },
    setRoleName (state, roleName) {
      state.roleName = roleName
    },
    setInitialRoute (state, initialRoute) {
      state.initialRoute = initialRoute
    },

  },
  getters: {
    user (state) {
      return state.user
    },
    allowedRoutes (state) {
      return state.routesByRole[state.roleName]
    }
  },
  actions: {
    setLoggedIn({ commit }, value) {
      if (process.env.NODE_ENV === 'development') {
        console.log('setLoggedIn', value)}
      commit('SET_LOGGED_IN', value)
    },

    async isLoggedIn({ state, commit, dispatch }) {
      if (process.env.NODE_ENV === 'development') {
        console.log('isLoggedIn')}
      if(state.loggedIn) {
        if (process.env.NODE_ENV === 'development') {
          console.log('state.loggedIn', state.loggedIn)}
        return true;
      }
      FirebaseConfig.setup();
      const auth = getAuth();
      return new Promise(async (resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if(!user){
            if (process.env.NODE_ENV === 'development') {
              console.log('user - signOut', user)}
            dispatch('signOut')
            resolve(false);
            return;
          }
          setTimeout(async function () {
            unsubscribe();
            // await dispatch('getRoutes')
            commit('setUser', user);
            const isLogged = await isUserLoggedIn(user.accessToken)
            if(!isLogged){
              if (process.env.NODE_ENV === 'development') {
                console.log('user - isLogged', isLogged)}
              dispatch('signOut')
              resolve(false);
              return false;
            }
            await dispatch('handlePersonalInfo')
            dispatch('setLoggedIn', true)
            resolve(true);
            if (process.env.NODE_ENV === 'development') {
              console.log('isLogged', isLogged)}
            return isLogged;
          }, 300);
        }, reject);
      });
    },


    async getRoutes({state, commit, dispatch}) {
      if (process.env.NODE_ENV === 'development') {
        console.log('getRoutes')}
      let allowedRoutesByRole = await fetchAllowedRolesForRoutes();

      router.options.routes.forEach(route => {
        if(!route.meta.requiresAuth || route.meta.allowedRoles.length > 0){
          return;
        }
        Object.entries(allowedRoutesByRole).forEach(([roleName, allowedRolesByRoute]) => {
          let routerName = route.meta.permissionName;

          if(Object.keys(allowedRolesByRoute).includes(routerName)) {
            route.meta.allowedRoles.push(roleName);
          }
        });
      });

      commit('SET_ROUTES', allowedRoutesByRole);
      commit('SET_ALLOW_ROLE_UPDATE', true);

      return allowedRoutesByRole
    },

    async handlePersonalInfo({state, commit, dispatch}) {
      let user = state.user;
      let userPersonalres = await getPersonalInfo(user.accessToken);
      if(!userPersonalres.status || !userPersonalres.data) {
        console.log('userPersonalres - false', userPersonalres);
        return false
      };
      user['building_id'] = userPersonalres.data.building_id;
      user['role'] = userPersonalres.data.role;
      commit('setRoleName', userPersonalres.data.role);
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
            isSignedIn = await handleSignIn(state.user.accessToken);
            await dispatch('handlePersonalInfo')

            dispatch('setLoggedIn', true)
            dispatch('logAnalytics')
            await dispatch('getRoutes')
            return state.loggedIn;
          })
          .catch((error) => {
            console.log("errorCode", error);
            const errorCode = error.code;
            const errorMessage = error.message;
            return false;
          });
      }
      else {
         let isSignedIn = await dispatch('signInWithPopup')
         if(isSignedIn) {
           isSignedIn = await handleSignIn(state.user.accessToken);
           await dispatch('handlePersonalInfo')
         }

         dispatch('setLoggedIn', isSignedIn)
         dispatch('logAnalytics')
      }
      await dispatch('getRoutes')
      return state.loggedIn;
    },



    async signInWithPopup({state, commit}) {
      let provider = new GoogleAuthProvider();
      const auth = getAuth();
      return await signInWithPopup(auth, provider)
        .then(async (result) => {

          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = await GoogleAuthProvider.credentialFromResult(result);
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

    async updateInitialRoute({commit, state, dispatch, rootState}) {
      for (let i = 0; i < state.loginRoutes.length; i++) {
        let route = state.loginRoutes[i];
        if(Object.keys(state.routesByRole[state.roleName]).includes(route)) {
          const matchingRoute = router.options.routes.find(routeName => {
            return routeName.meta && routeName.meta.permissionName === route;
          })
          if(Object.keys(matchingRoute).length > 0) {
            localStorage.setItem("initialRoute", matchingRoute.path);
            commit('setInitialRoute', matchingRoute.name);
            router.push({ name: matchingRoute.name });
            return;
          }
        }
      }
      await dispatch('signOut', false)
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
      analytics.identify(state.user['email'], {
        "id": state.user['email'],
        "company_id": state.user['building_id'],
        "email": state.user['email'],
        "name": state.user['displayName'],
      });
    }

  }
}
