import db from "../firebase.js"
import { create, 
        findOne, 
        findAll,
        updateOne, 
        deleteOne} from '../repositories/products.js'


export const createProduct = async (productData) => {
    return await create(productData)
}

export const findById = async (productId) => {
    return await findOne(productId)
}

export const allProducts = async (filters = {}) => {
    return await findAll(filters)
}

export const updateProduct = async (productId, updateData) => {
   return await updateOne(productId, updateData)
}

export const deleteProduct = async (productId) => {
    return await deleteOne(productId)
}