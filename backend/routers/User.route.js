import express from'express'
const router = express.Router()
import UserController from '../controllers/User.controller.js'

router.post('/register',UserController.register)
router.post('/login',UserController.login)
router.get('/getAll',UserController.getAllUser)
router.get('/getById/:id',UserController.getUserById)
router.put('/update/:id',UserController.updateUserbyId)
router.delete('/delete/:id',UserController.deleteUserById)
export default router