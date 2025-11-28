import express from 'express'
import authRoutes from './src/routes/authRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import { authMiddleware } from './src/middleware/authMiddleware.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoutes)
app.use('/api/products', authMiddleware, productRoutes)

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})