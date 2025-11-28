import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

const creds = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "techlab-proyecto-final.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket:  process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId:  process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId:  process.env.FIREBASE_APP_ID
}

const app = initializeApp(creds)
const db = getFirestore(app)

export default db