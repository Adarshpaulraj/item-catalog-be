import mongoose from'./index.js'
 

const validateEmail = (e)=>{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e); 
}

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'required name']
    },
    lastName:{
        type:String,
        required:[true,'last name reqiured']
    },
    email:{
        type:String,
        required:[true,"Email is required"]
        ,validate:validateEmail},
    password:{
        type:String,
        required:[true,"Password is required"]
    },
 
    status:{
        type:Boolean,
        default:true
    },
    role:{type:String,default:'user'},
    createdAt:{
        type:Date,
        default: Date.now()
    } 
    
},{
    collection:'userList',
    versionKey:false
})

const userModel=mongoose.model('userList',userSchema)
export default userModel