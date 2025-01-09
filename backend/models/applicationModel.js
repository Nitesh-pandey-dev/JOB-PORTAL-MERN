const mongoose = require('mongoose');
const applicationSchema = mongoose.Schema({
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    }
},{timestamps:true});
module.exports = mongoose.model("Application",applicationSchema)