import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDNP5L6PkO66hyfGS5CK5STP85WgdzloS8",
    authDomain: "summerproject-5e9c6.firebaseapp.com",
    projectId: "summerproject-5e9c6",
    storageBucket: "summerproject-5e9c6.appspot.com",
    messagingSenderId: "133247648449",
    appId: "1:133247648449:web:cd251986341d1b68deca40"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  export {auth,db,storage};
