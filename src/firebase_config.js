// Import the functions you need from the SDKs you need
import { meta } from "@eslint/js";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.VITE_apiKey,
  authDomain:import.meta.VITE_authDomain,
  projectId:import.meta.VITE_projectId,
  storageBucket:import.meta.VITE_storageBucket,
  messagingSenderId:import.meta.VITE_messagingSenderId,
  appId:import.meta.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);