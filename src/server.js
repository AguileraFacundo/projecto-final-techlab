import express from 'express'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import { authMiddleware } from './middleware/authMiddleware.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
// routes
app.use('/api/auth', authRoutes)
app.use('/api/products', authMiddleware, productRoutes)

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})