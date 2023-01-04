// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA2tp1yvoJQGG8_45QmFDVaMXOUarUB64",
  authDomain: "solution-challenge-b441b.firebaseapp.com",
  projectId: "solution-challenge-b441b",
  storageBucket: "solution-challenge-b441b.appspot.com",
  messagingSenderId: "776031906850",
  appId: "1:776031906850:web:0d16c7dc4fc548e8832e7b",
  measurementId: "G-F843H2KC6J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);