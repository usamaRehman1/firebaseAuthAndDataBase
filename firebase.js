// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,
    GoogleAuthProvider, signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore, setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw23h0MRirRpBUq19qzTI_qNJBaYBvLEg",
  authDomain: "deomoauth.firebaseapp.com",
  projectId: "deomoauth",
  storageBucket: "deomoauth.firebasestorage.app",
  messagingSenderId: "59053043816",
  appId: "1:59053043816:web:7b6b8175b3acac33e78bdd",
  measurementId: "G-NK7B6EGYG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const googleProvider = new GoogleAuthProvider();

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    // sign in with google
    googleProvider,
    GoogleAuthProvider,
    signInWithPopup,
    // data base method export
    db,
    setDoc,
    getDoc,
    doc,
}