import mongoose from './index.js'

const productSchema= new mongoose.Schema({
    name:{type:String,required:[true,'required name']},
    imageUrl:{type:String,required:[true,'required imageUrl']},
    brand:{type:String,required:[true,'required brandname']},
    discountPrice:{type:Number,default:0,required:[true,'required price']},
    size:{type:String,required:[true,'required Size']},
    offer:{type:Number,default:0,required:[true,'required offer']},
    category:{type:String,required:[true,'required cataegory']},
    price:{type:Number,required:[true,'required Actual Price']},
    description:{type:String,required:[true,'required description']},
    countInStock:{type:String,default:0,required:[true,'required countInStock']},
    createdBy:{type:String,required:[true,"createdBy is required"]},
    modifiedAt:{type:Date},
    modifiedBy:{type:String,default:""},
    createdAt:{type:Date,default: Date.now()}

  },{
    collection:'itemList',
    versionKey:false
 })
 const productModel = mongoose.model('itemList',productSchema)
 export default productModel


