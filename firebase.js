// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import config from "./config";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: config.APP_ENV_FIREBASE_API_KEY,
  authDomain: config.APP_ENV_FIREBASE_AUTH_DOMAIN,
  projectId: config.APP_ENV_FIREBASE_PROJECT_ID,
  storageBucket: config.APP_ENV_FIREBASE_STORE_BUCKET,
  messagingSenderId: config.APP_ENV_FIREBASE_MESSAGING_SENDER_ID,
  appId: config.APP_ENV_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, auth };
