import productModel from "../models/productModel.js";


const createProduct=async(req,res)=>{
    try {
        const {name,image,brand,price,category,description,disprice,stock,offer,size}=req.body
        const productData= await productModel.create({
            name,imageUrl:image,brand, price,category,description,size,discountPrice:disprice,offer,countInStock:stock,createdBy:req.headers.userId
        })
        if(productData){
            res.status(201).send({message:"sucessfully created product",productData})
        }else{
            res.status(401).send({message:"product does not created"})
        }

    } catch (error) {
        res.status(501).send({message:"internal server error",error})
    }
    
}



const getAllProduct= async(req,res)=>{
    try {
        const data=await productModel.find({})
        if(data){
            res.status(200).send({message:"sucessfully get the product list",data})
        } 
    } catch (error) {
        res.status(500).send({message:"internal server error",error:error.message})
    }}
const getProductById=async(req,res)=>{
try {
    const data=await productModel.findById({_id:req.params.id})
        if(data){
        res.status(200).send({message:"sucessfull get by id",data})
    }else{
        res.status(401).send({message:"id does not match"})
    }

} catch (error) {
    res.status(500).send({message:"internal server error",error:error.message})

}       
}

const deleteById=async(req,res)=>{
    try {
         const id=await productModel.findById({_id:req.params.id})
        if(id){
            await productModel.deleteOne({_id:id})
            res.status(200).send({message:"sucessfully deleted",id})
        }else{
            res.status(401).send({message:"id does not match"})
        }
    
    } catch (error) {
        res.status(500).send({message:"internal server error",error:error.message})
    
    }       
    }
 

const editProduct = async(req,res)=>{
    try {
        const Id = req.params.id
        if(Id)
        {
            const {name,image,brand,price,category,description,disprice,stock,offer,size}=req.body
            const data =await productModel.findById(Id)
             data.name=name
            data.description=description
            data.price=price
            data.imageUrl=image
            data.category=category
            data.brand=brand
             data.discountPrice=disprice
            data.countInStock=stock
            data.modifiedAt=Date.now()
            data.modifiedBy=req.headers.userId
            data.offer=offer
             data.size=size
            await data.save()  
             res.status(200).send({message:"Product Edited Successfully",data})
        }
        else
        {
            res.status(400).send({message:"product Id Not found"})
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}




export default {
    createProduct,getAllProduct,getProductById,editProduct,deleteById
}