// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { getFirestore } from'firebase/firestore';


import { firebaseConfig } from '../firebase';

if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig) }

export const auth = firebase.auth()
export const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true })
export const db = getFirestore();
export const storage = firebase.storage();