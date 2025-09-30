// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZW1sJ1so47DHSv6EETdbPVgzdJJKjMwA",
  authDomain: "swiftstay-nigeria.firebaseapp.com",
  projectId: "swiftstay-nigeria",
  storageBucket: "swiftstay-nigeria.firebasestorage.app",
  messagingSenderId: "985479292413",
  appId: "1:985479292413:web:4c61b837c2a12575b4e594",
  measurementId: "G-Q3M99D67LL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
