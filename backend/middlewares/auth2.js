const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const check2 = async(req,res,next) => {
    try {
        // console.log(req.body.headers.token);
        const token =await req?.body?.headers?.token;
        // console.log(token);
        if(!token) return res.json({success:false,message:"User is not authenticated!!"});
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const userr = await usersModel.findOne({email:decode.email});
        if(!userr) return res.json({success:false,message:"Unable to get user"});
        req.user = userr;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
}
module.exports = check2;