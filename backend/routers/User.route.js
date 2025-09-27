import express from 'express'
const router = express.Router()
import UserController from '../controllers/User.controller.js'

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/', UserController.getAllUser)
router.get('/:id', UserController.getUserById)
router.get("/profile", UserController.getProfile);
router.put('/:id', UserController.updateUserById)
router.delete('/:id', UserController.deleteUserById)
export default router