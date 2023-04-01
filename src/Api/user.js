import axios from './index.js'


export function fetchAllowedRolesForRoutes(idToken) {
  return axios.get('/registration/allowedRoles').then(response => {
      return response.data.allowedRolesByRoute;
   }).catch((e) => {
     console.error(e.message);
     return {};
  });
}

export function resgiterNewApi(user) {
    return axios.post('/registration/new', {accessToken: user.accessToken})
      .then(response => {
        return response.data.status;
     });
}

export function isUserLoggedIn(token) {
  return axios.post('/registration/isSignedIn', {accessToken: token})
    .then(response => {
      return response.data.status;
   });
}



export function handleSignIn(idToken) {
  return axios.get('/registration/login', {
    headers: {
      Authorization: `Bearer ${idToken}`,
    }
  }).then(response => {
      return response.data.status;
   }).catch((e) => {
     console.error(e.message);
     return false;
  });
}
