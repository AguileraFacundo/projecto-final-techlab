import db from '../../firebase.js'
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

const userColection = collection(db, "users")

export const checkEmail = async (email) => {
    try {
        const q = query(userColection, where("email", "==", email.trim()))
        const snapshot = (await getDocs(q))
        return snapshot
    } catch (err) {
        throw err
    }
}

export const createEmail = async (email, hashedPassword) => {
    try {
        const user = await addDoc(userColection, {
            email: email,
            password: hashedPassword
        })
        return {
            id: user.id,
            email: email,
        }
    } catch (err) {
        throw err
    }
}