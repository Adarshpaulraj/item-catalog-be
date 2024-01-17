import express from 'express'
import productRouter from '../controller/productController.js'
import Auth from '../auth/auth.js'
const router = express.Router()

router.post('/create',Auth.validate,Auth.adminGaurd,productRouter.createProduct)
router.get('/',Auth.validate,productRouter.getAllProduct)
router.get('/:id',Auth.validate,productRouter.getProductById)
router.put('/edit/:id',Auth.validate,Auth.adminGaurd,productRouter.editProduct)
router.delete('/delete/:id',Auth.validate,Auth.adminGaurd,productRouter.deleteById)


export default router