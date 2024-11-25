// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBNiVsCzEUrLTU1CJAv44R3DOdk52SzIWc",
  authDomain: "myhexschool-dev.firebaseapp.com",
  projectId: "myhexschool-dev",
  storageBucket: "myhexschool-dev.firebasestorage.app",
  messagingSenderId: "1032490798111",
  appId: "1:1032490798111:web:00122b0ad467230f1c992a",
  measurementId: "G-H1RT4MJB6V"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
