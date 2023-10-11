// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCxngMyNBQR0aeQ8xg8XdWm3muI-Ubagrc",
    authDomain: "calcium-alchemy-394407.firebaseapp.com",
    projectId: "calcium-alchemy-394407",
    storageBucket: "calcium-alchemy-394407.appspot.com",
    messagingSenderId: "957584540156",
    appId: "1:957584540156:web:5d0df695f8964c8b207279",
    measurementId: "G-NHDGKN6CN5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
// const analytics = getAnalytics(app);