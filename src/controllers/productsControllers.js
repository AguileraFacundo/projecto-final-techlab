import { createProduct,
        findById, 
        allProducts, 
        deleteProduct, 
        updateProduct } from '../services/serviceProducts.js'

export const createOne = async (req, res) => {
    try {
        const { title, price, category } = req.body
        if ( !title || !price || !category ){
            return res.status(400).json({ 
                "status": "fail",
                "message": "invalid request" 
            })
        }
        const product = await createProduct({ title, price, category })
        res.status(201).json(product)
    }catch (err) {
        res.status(400).json({ 
            "status": "fail",
            "message": err.message
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const { id } = req.params
        const product = await findById(id)
    
        if (!product) {
            return res.status(404).json({ 
                "status": "fail",
                "message": "product not found" 
            })}
    
        res.status(200).json(product)
    }catch (err) {
        return res.status(400).json({ 
            "status": "fail",
            "message": err.message 
        })
    }
    
}

export const getMany = async (req, res) => {
    try {
        const { category } = req.query
        const products = await allProducts({ category })
        res.status(200).json(products)
    }catch (err) {
        res.status(400).json({ 
            "status": "fail",
            "message": err.message 
        })
    }
}

export const updateOne = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body
        const product = await updateProduct(id, updateData)
        return res.status(200).json(product)
    }catch (err) {
        return res.status(400).json({ 
            "status": "fail",
            "message": err.message
        })
    }
}
export const deleteOne = async (req, res) => {
    try {
        const { id } = req.params
        const checkProduct = await findById(id)
        if (!checkProduct) {
            return res.status(400).json({ 
                "status": "fail",
                "message": "invalid id" 
            })
        }
        await deleteProduct(id)
        return res.status(204).send()

    }catch (err) {
        return res.status(400).json({ 
            "status": "fail",
            "message": err.message
         })
    }
}