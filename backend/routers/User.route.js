import express from 'express'
const router = express.Router()
import UserController from '../controllers/User.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/', UserController.getAllUser)
router.get("/profile",authMiddleware, UserController.getProfile);
router.get('/:id', UserController.getUserById)
router.put('/:id', UserController.updateUserById)
router.delete('/:id', UserController.deleteUserById)
export default router