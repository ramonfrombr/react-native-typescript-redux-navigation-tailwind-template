// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  APP_ENV_FIREBASE_API_KEY,
  APP_ENV_FIREBASE_AUTH_DOMAIN,
  APP_ENV_FIREBASE_PROJECT_ID,
  APP_ENV_FIREBASE_STORE_BUCKET,
  APP_ENV_FIREBASE_MESSAGING_SENDER_ID,
  APP_ENV_FIREBASE_APP_ID,
} from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: APP_ENV_FIREBASE_API_KEY,
  authDomain: APP_ENV_FIREBASE_AUTH_DOMAIN,
  projectId: APP_ENV_FIREBASE_PROJECT_ID,
  storageBucket: APP_ENV_FIREBASE_STORE_BUCKET,
  messagingSenderId: APP_ENV_FIREBASE_MESSAGING_SENDER_ID,
  appId: APP_ENV_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, auth, db };
