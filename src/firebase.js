// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVvWsjhAw1WwxAd_QIykDY0tejvwK5vN4",
  authDomain: "swiftstay-nigeria-a55fc.firebaseapp.com",
  projectId: "swiftstay-nigeria-a55fc",
  storageBucket: "swiftstay-nigeria-a55fc.firebasestorage.app",
  messagingSenderId: "105387616465",
  appId: "1:105387616465:web:fd89e5cebf23e3f997bdf0",
  measurementId: "G-2C8S34KKCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
