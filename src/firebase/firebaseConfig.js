import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSsCPF0QbI3kVOlWFDXERqUwAu2LfaSgY",
  authDomain: "number-test-a9cac.firebaseapp.com",
  projectId: "number-test-a9cac",
  storageBucket: "number-test-a9cac.appspot.com",
  messagingSenderId: "504571076068",
  appId: "1:504571076068:web:f27aa0a41316fc6620bbf1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
