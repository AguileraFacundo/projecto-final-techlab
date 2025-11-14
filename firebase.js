import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import creds from './creds.json' with { type: 'json' };

initializeApp({
    credential: cert(creds)
})

const db = getFirestore()

export default db