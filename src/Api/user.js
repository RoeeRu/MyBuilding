import axios from './index.js'


export function resgiterNewApi(user) {
    return axios.post('/registration/new', {accessToken: user.accessToken})
      .then(response => {
        console.log(response.data.data);
        return response.data.status;
     });
}

export function isUserLoggedIn(token) {
  return axios.post('/registration/isSignedIn', {accessToken: token})
    .then(response => {
      console.log(response.data.status);
      return response.data.status;
   });
}



export function handleSignIn(idToken) {
  return axios.get('/registration/login', {
    headers: {
      Authorization: `Bearer ${idToken}`,
    }
  }).then(response => {
      console.log(response.data);
      return response.data.status;
   }).catch((e) => {
     console.error(e.message);
     return false;
  });
}
