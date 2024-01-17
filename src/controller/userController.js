import userModel from '../models/userModel.js'
import auth from '../auth/auth.js'

const create= async(req,res)=>{
    try {
        const user=await userModel.findOne({email:req.body.email})
        if(!user){
            req.body.password=await auth.hashPassword(req.body.password)
            const userData=await userModel.create(req.body)
            res.status(201).send({message:"successfully created ",userData})
        }else{
            res.status(400).send({message:"email existing"})
        }
    } catch (error) {
        res.status(500).send({message:"internal server error",error:error.message})
        console.log(error)
    }
  
}

const getAllUsers=async(req,res)=>{
    try {
        const users=await userModel.find({})
        console.log(users);
        if(users){
            res.status(200).send({message:"successfully Get All Users",users})
         } 
    } catch (error) {
        res.status(500).send({message:"internal server error",error:error.message})

    }
}
const login =async(req,res)=>{
    try {
        const user=await userModel.findOne({email:req.body.email})
        if(user){
            let hashCompare=await auth.hashCompare(req.body.password,user.password)
            if(hashCompare){
                const token=await auth.createToken({
                    firstName:user.firstName,
                    lastName:user.lastName,
                    id:user._id,
                    email:user.email,
                    role:user.role
                })
                let userdata=await userModel.findOne({email:req.body.email},{id:0})
                res.status(200).send({message:"Login Successfuly",userdata,token})
            }else{
                res.status(401).send({message:"incorrect password"})
            }
        }else{
            res.status(401).send({message:"email does not exist"})
        }
    } catch (error) {
        res.status(500).send({message:"internal error",error})
    }
}

export default {
    create,
login,
getAllUsers
}