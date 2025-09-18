import express from 'express'
const router = express.Router()
import CartController from '../controllers/Cart.controller.js'

router.get('/', CartController.getCart)
router.post('/add', CartController.addToCart)
router.put('/update', CartController.updateQuantity)
router.delete('/remove', CartController.removeFromCart)

export default router