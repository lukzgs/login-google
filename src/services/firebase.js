// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from 'firebase/compat/app';
// import { initializeApp } from 'firebase/app';
import { getFirestore } from'firebase/firestore';
import { getAuth } from 'firebase/auth';

import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

import { firebaseConfig } from '../firebase';

if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

export const auth = getAuth();
export const db = getFirestore();

export const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

export const storage = firebase.storage();