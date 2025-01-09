const mongoose = require('mongoose');
const companySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        state:{
            type:String
        },
        city:{
            type:String
        },
        pincode:{
            type:Number
        },
        residence:{
            type:String
        }
    },
    logo:{
        type:String,
    },
    description:{
        type:String,
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
},{timestamps:true});
module.exports = mongoose.model("Company",companySchema);