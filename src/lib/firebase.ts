import { initializeApp, getApp, getApps } from "firebase/app";

const firebaseConfig = {
  "projectId": "fencetime",
  "appId": "1:451492695523:web:11a82d5c23686ed63124d6",
  "storageBucket": "fencetime.firebasestorage.app",
  "apiKey": "AIzaSyDbimkqg4_K7H4nX4ZX4J71nmEOD-I4tYo",
  "authDomain": "fencetime.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "451492695523"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
