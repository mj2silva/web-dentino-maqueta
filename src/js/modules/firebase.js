import firebase from 'firebase';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyArvXAou1wdX2sQNQLqhZD9SBWiUxjbdgA",
  authDomain: "dentino-web.firebaseapp.com",
  projectId: "dentino-web",
  storageBucket: "dentino-web.appspot.com",
  messagingSenderId: "200524047422",
  appId: "1:200524047422:web:1aa6f9958a256203019d6f",
  measurementId: "G-X177X5LRXL"
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

export const firestore = firebase.firestore();
export const toFirebaseTimestamp = (date) => firebase.firestore.Timestamp.fromDate(date);