import express from 'express'
import { createOne,
        getOne,
        getMany,
        updateOne,
        deleteOne } from '../controllers/productsControllers.js'

const router = express.Router();

router.post('/', createOne);
router.get('/:id', getOne);
router.get('/', getMany);
router.put('/:id', updateOne);
router.delete('/:id', deleteOne);

export default router