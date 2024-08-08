// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKmhd7hNhJWeaLkhZpGiusiLdamhMA0bw",
  authDomain: "pantry-manager-c1efe.firebaseapp.com",
  projectId: "pantry-manager-c1efe",
  storageBucket: "pantry-manager-c1efe.appspot.com",
  messagingSenderId: "917132265880",
  appId: "1:917132265880:web:cffd40862c5328c807c3ed",
  measurementId: "G-SYVNYVGEMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export{app, firestore}
const analytics = getAnalytics(app); 
