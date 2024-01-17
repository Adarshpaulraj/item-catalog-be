import express from 'express'
 import Auth from '../auth/auth.js'
 import dashboard from '../controller/dashboard.js'
const router = express.Router()

router.get('/',Auth.validate,dashboard)
export default router