import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
  
const hashPassword =async(password)=>{
const salt=await bcrypt.genSalt(Number(process.env.SALT_ROUNDS))
const hash=await bcrypt.hash(password,salt)
return hash
}

const hashCompare=async(password,hash)=>{
    return await bcrypt.compare(password,hash)
}
const createToken=async(payload)=>{
    const token= await jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
    return token
}
 const decodeToken=async (token)=>{
    const payload=await jwt.decode(token)
    return payload
 }

const validate=async(req,res,next)=>{
    const token = await req.headers.authorization?.split(" ")[1]
    if(token){
        const payload=await decodeToken(token)
        req.headers.userId=payload.id
        const currentTime=(+new Date())/1000
        if(currentTime<payload.exp){
            next()
        }else{
            res.status(401).send({message:'token expired'})
        }
    }else{
        res.status(500).send({messge:"token not found"})
    }
}



const adminGaurd=async(req,res,next)=>{
    const token=await req.headers.authorization?.split(" ")[1]
    if(token){
        const payload=await decodeToken(token)
        if(payload.role==="admin"){
            next()
        }else{
            res.status(401).send({message:"admins only alloweded"})
        }
    }else{
        res.status(500).send({message:"not found"})
    }
}

 export default {hashPassword,hashCompare,createToken,validate,adminGaurd}