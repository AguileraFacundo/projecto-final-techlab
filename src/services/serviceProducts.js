import db from "../firebase.js"


const collectionName = "products"

export const createProduct = async (productData) => {
    const docRef = await db.collection(collectionName).add({
            ...productData,
            createdAt: new Date(),
            updatedAt: new Date()
        });

    return { id: docRef.id, ...productData }
}

export const findById = async (productId) => {
    const doc = await db.collection(collectionName).doc(productId).get()
    if (!doc.exists) return null;
    
    return { id: doc.id, ...doc.data() }
}

export const allProducts = async (filters = {}) => {
    const query = db.collection(collectionName)
    if (filters.category) {
        query = query.where("category", "==", filters.category)
    }
    const snap = await query.get();

    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const updateProduct = async (productId, updateData) => {
        await db.collection(collectionName).doc(productId).update({
            ...updateData,
            updateAt: new Date()
        })
        return findById(productId)
}

export const deleteProduct = async (productId) => {
    await db.collection(collectionName).doc(productId).delete()
}