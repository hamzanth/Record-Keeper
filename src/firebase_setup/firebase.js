// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRVGvm2LSGH4M5OrJTNUVzg7ScIqAEMso",
  authDomain: "record-keeper-3aa80.firebaseapp.com",
  projectId: "record-keeper-3aa80",
  storageBucket: "record-keeper-3aa80.appspot.com",
  messagingSenderId: "921212292236",
  appId: "1:921212292236:web:5983b18bbdb63b47fbffa9",
  measurementId: "G-EV7NBFN547"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firebase = getFirestore(app)
