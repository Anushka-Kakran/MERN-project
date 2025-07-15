// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6-bh6D-p9w65kXrXErpPCKAfq_QlCJZw",
  authDomain: "mern-book-inventory-42c01.firebaseapp.com",
  projectId: "mern-book-inventory-42c01",
  storageBucket: "mern-book-inventory-42c01.firebasestorage.app",
  messagingSenderId: "482729855677",
  appId: "1:482729855677:web:f864253569f395c67cc5d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;