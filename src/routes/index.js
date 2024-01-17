import userRouter from './userRouter.js'
import productRouter from './productRouter.js'
import dashboardRouter from './dashboard.js'
import expres from 'express'
const router = expres.Router()


router.use('/user',userRouter)
router.use('/item',productRouter)
router.use('/dashboard',dashboardRouter)

export default router