import express from 'express'
const router = express.Router()
import ProductController from '../controllers/Product.controller.js'

router.get('/', ProductController.getAllProduct)
router.get('/best-sellers', ProductController.BestSeller)
router.get('/filter',ProductController.getFilteredProducts)
router.get('/:id', ProductController.getProductById)
router.post('/', ProductController.createProduct)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

export default router