// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6W6lEIq1N-ROSC7SEFdQZabFU2yyOZVU",
  authDomain: "seraya-cd251.firebaseapp.com",
  projectId: "seraya-cd251",
  storageBucket: "seraya-cd251.appspot.com",
  messagingSenderId: "250591433831",
  appId: "1:250591433831:web:f1212546ca27e4115ff0c2",
  measurementId: "G-5XVFSNPHX6",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)

// const analytics = getAnalytics(app);
