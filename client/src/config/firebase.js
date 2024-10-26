import {initializeApp} from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, FacebookAuthProvider, updateProfile, updateEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import {getStorage} from 'firebase/storage'
import { getFirestore, getDocs, collection, setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_API_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };
  
  const firebaseApp = initializeApp(firebaseConfig)
  const db = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp)
  const provider = new GoogleAuthProvider()
  const fbProvider = new FacebookAuthProvider()
  const storage = getStorage(firebaseApp)

  export {auth, provider, storage, signInWithPopup, onAuthStateChanged, signOut, getDocs, collection, setDoc, doc, getDoc, fbProvider, updateEmail, updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser, deleteDoc }
  export default db
