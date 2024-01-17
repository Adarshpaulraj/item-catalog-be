import express from 'express'
import appRouter from './src/routes/index.js'
import cors from 'cors'
const app=express()
app.use(express.json())
const PORT= process.env.PORT
 app.use(cors())
app.use('/',appRouter)





app.listen(PORT,()=>console.log(`server listening port is ${PORT}`))

