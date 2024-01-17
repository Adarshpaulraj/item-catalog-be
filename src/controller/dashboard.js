import productModel from "../models/productModel.js";




const getAllProduct= async(req,res)=>{
    try {
        const data=await productModel.find({})
        if(data){
            res.status(200).send({message:"sucessfully get the product list",data})
        } 
    } catch (error) {
        res.status(500).send({message:"internal server error",error:error.message})
    }}


    export default getAllProduct