import express from 'express'
const router = express.Router()
import CartController from '../controllers/Cart.controller.js'
import {authMiddleware} from '../middlewares/authMiddleware.js'
router.get('/', authMiddleware,CartController.getCart)
router.post('/add', authMiddleware,CartController.addToCart)
router.put('/update',authMiddleware, CartController.updateQuantity)
router.delete('/remove', authMiddleware,CartController.removeFromCart)

export default router