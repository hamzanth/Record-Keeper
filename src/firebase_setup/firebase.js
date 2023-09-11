// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEqcnDbml771Mjzm4WEMOcbYs8Ko7tW8U",
  authDomain: "record-keeper-dbeeb.firebaseapp.com",
  projectId: "record-keeper-dbeeb",
  storageBucket: "record-keeper-dbeeb.appspot.com",
  messagingSenderId: "291527137338",
  appId: "1:291527137338:web:4eec0451554a4e1850bd03",
  measurementId: "G-JGGSNFH6YW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const firebase = getFirestore(app)

export {
  auth,
  firebase
}
