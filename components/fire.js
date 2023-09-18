import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCPL0-m8E4tLMBw7QXSEBDQiPo_LhQq0mc",
  authDomain: "next-app-9d8ae.firebaseapp.com",
  projectId: "next-app-9d8ae",
  storageBucket: "next-app-9d8ae.appspot.com",
  messagingSenderId: "691697887050",
  appId: "1:691697887050:web:d19a32292bb6ffdbd8c3b3"
};

if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig)
}