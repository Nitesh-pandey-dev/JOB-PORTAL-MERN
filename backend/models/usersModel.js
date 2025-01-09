const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please enter your email!!"]
    },
    password:{
        type:String,
        required:true,
        minLength:[4,"Atleast 4 characters required"]
    },
    phone:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:["Employee","Employer"]
    },
    profile:{
        bio:{type:String,default:""},
        skills:{type:Array,default:[]},
        resume:{type:String},
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Company"
        }
    },
     photo:{
            type:String,
            default:""
        }
},{timestamps:true});
module.exports = mongoose.model('User',userSchema);