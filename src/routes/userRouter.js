import express from 'express'
 import userController from '../controller/userController.js'

const router = express.Router()

router.post('/create',userController.create)
router.post('/login',userController.login)
router.get('/',userController.getAllUsers)
export default router