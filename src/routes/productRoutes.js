import express from 'express'
import { createProduct,
        getOne,
        getMany,
        updateProduct,
        deleteProduct } from '../controllers/productsControllers.js'

const router = express.Router();

router.post('/create', createProduct);
router.get('/:id', getOne);
router.get('/', getMany);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router