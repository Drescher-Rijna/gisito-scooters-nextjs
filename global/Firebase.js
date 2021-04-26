import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBFfm3idC8tzkwQK2vEF9arMydfNJm9GNk",
    authDomain: "gisito-scooters-v5.firebaseapp.com",
    projectId: "gisito-scooters-v5",
    storageBucket: "gisito-scooters-v5.appspot.com",
    messagingSenderId: "46239484013",
    appId: "1:46239484013:web:421fea44ba2fbf812ed764"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  

  const productStorage = firebase.storage();
  const db = firebase.firestore();
  const auth = firebase.auth();

  export { productStorage, db, auth }