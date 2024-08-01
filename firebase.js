// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjElxN6FHyseNsV6kKKaqoaz1eT5__BX0",
  authDomain: "hspantryapp-f9dd8.firebaseapp.com",
  projectId: "hspantryapp-f9dd8",
  storageBucket: "hspantryapp-f9dd8.appspot.com",
  messagingSenderId: "676844597829",
  appId: "1:676844597829:web:42995772b89b71afafe92c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {app,firestore};