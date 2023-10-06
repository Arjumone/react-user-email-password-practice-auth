// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsfLUF7tE806DeD0xHnXIlmofjT6O3SeY",
  authDomain: "r-user-email-password-auth2.firebaseapp.com",
  projectId: "r-user-email-password-auth2",
  storageBucket: "r-user-email-password-auth2.appspot.com",
  messagingSenderId: "548641758253",
  appId: "1:548641758253:web:4066521bc77703720feca4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default  auth;