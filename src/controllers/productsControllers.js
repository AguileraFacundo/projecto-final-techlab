import { createOne, findOne, updateOne, findAll, deleteOne } from "../repositories/products.js"

export const createProduct = async (req, res) => {
    try {
        const { name, price, category } = req.body
        if ( !name || !price || !category ){
            return res.status(400).json({ 
                "status": "fail",
                "message": "invalid request" 
            })
        }
        const product = await createOne({ name, price, category })
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
        const product = await findOne(id)
    
        if (!product) {
            return res.status(404).json({ 
                "status": "fail",
                "message": "product not found" 
            })
        }
    
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
        const products = await findAll()
        if (!products) {
            return res.status(403).json({
                "status": "fail",
                "message": "products not found"
            })
        }
        res.status(200).json(products)
    }catch (err) {
        res.status(400).json({ 
            "status": "fail",
            "message": err.message 
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body
        const productUpdate = await updateOne(id, updateData)
        if (!productUpdate) return res.status(400).json({
            "status": "fail",
            "message": "update failed"
        })
        return res.status(200).json(productUpdate)
    }catch (err) {
        return res.status(400).json({ 
            "status": "fail",
            "message": err.message
        })
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const checkProduct = await findOne(id)
        if (!checkProduct) {
            return res.status(400).json({ 
                "status": "fail",
                "message": "invalid id" 
            })
        }
        await deleteOne(id)
        return res.status(204).send()

    }catch (err) {
        return res.status(400).json({ 
            "status": "fail",
            "message": err.message
         })
    }
}