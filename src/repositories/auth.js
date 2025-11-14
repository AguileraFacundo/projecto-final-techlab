import db from '../../firebase.js'

export const checkEmail = async (email) => {
    const usersRef = db.collection("users")
    const snapshot = await usersRef.where("email", "==", email).get()
    return snapshot
}

export const getEmail = async (email) => {
    const usersRef = db.collection("users")
    const snapshot = await usersRef.where("email", "==", email).limit(1).get()
    return snapshot
}

export const createEmail = async (email, hashedPassword) => {
    const userRef = db.collection("users")
    const docRef = await userRef.add({
        email: email,
        password: hashedPassword,
        createAt: new Date()
    })
    return {
        id: docRef.id,
        email: email,
    }
}