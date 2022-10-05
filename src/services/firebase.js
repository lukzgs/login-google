// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBjkT21UGvKG490-90lftyKnqAIgI2cTBA",
  authDomain: "login-59a05.firebaseapp.com",
  projectId: "login-59a05",
  storageBucket: "login-59a05.appspot.com",
  messagingSenderId: "325142502857",
  appId: "1:325142502857:web:3e60fed0351b5ad8a4dc18"
};

if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig) };

export const auth = firebase.auth()
// export const firestore = firebase.firestore();
export const storage = firebase.storage();