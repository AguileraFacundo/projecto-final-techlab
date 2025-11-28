import db from "../../firebase.js"
import { collection, getDocs, getDoc, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
    
const collectionName = "products"
const productsColecction = collection(db, collectionName)

export const createOne = async (productData) => {
    try {
        const docRef = await addDoc(productsColecction, productData)
        return { id: docRef.id, ...productData }
    } catch (err) {
        return err
    }
}

export const findOne = async (productId) => {
    try {
        const docRef = doc(productsColecction, productId)
        const snapshot = await getDoc(docRef)
        if (!snapshot.exists()) {
            return null;
        }
        
        return { id: snapshot.id, ...snapshot.data() }
    } catch (err) {
        throw err
    }
}

export const findAll = async () => {
    try {
        const snapQuery = await getDocs(productsColecction)
        if (snapQuery.empty) return false;

        return snapQuery.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (err) {
        return err
    }
}

export const updateOne = async (productId, updateData) => {
     try {
        const docRef = doc(productsColecction, productId)
        await updateDoc(docRef, updateData)
        const response = await findOne(productId)
        if (!response) return false;
        return response
    } catch (err) {
        return err
    }

}

export const deleteOne = async (productId) => {
    try {
        const docRef = doc(productsColecction, productId)
        await deleteDoc(docRef)
    } catch (err) {
        return err
    }
}