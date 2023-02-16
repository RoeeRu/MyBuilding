// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const FirebaseConfig = ({

  async setup() {
    const firebaseConfig = {
    apiKey: "AIzaSyB0S-ph1I9ZKswD77KLprxjXGI_fuG74m4",
    authDomain: "housemanager-3e518.firebaseapp.com",
    projectId: "housemanager-3e518",
    storageBucket: "housemanager-3e518.appspot.com",
    messagingSenderId: "1003612147851",
    appId: "1:1003612147851:web:b2d76596cafef0d369c48e",
    measurementId: "G-E53MTXS6Y6"
  };
    // Initialize Firebase
    // const analytics = await getAnalytics(firebaseApp);

    return await initializeApp(firebaseConfig);
  }

})


// import * as firebase from "firebase/app";
//
// const firebaseConfig = {
//   apiKey: "AIzaSyB0S-ph1I9ZKswD77KLprxjXGI_fuG74m4",
//   authDomain: "housemanager-3e518.firebaseapp.com",
//   projectId: "housemanager-3e518",
//   storageBucket: "housemanager-3e518.appspot.com",
//   messagingSenderId: "1003612147851",
//   appId: "1:1003612147851:web:b2d76596cafef0d369c48e",
//   measurementId: "G-E53MTXS6Y6"
// };
//
// export const firebaseApp = firebase.initializeApp(firebaseConfig);
