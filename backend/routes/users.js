var express = require('express');
const usersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const check = require('../middlewares/auth');
const token = require('../middlewares/token');
const upload = require('../config/multer');
const check2 = require('../middlewares/auth2');
var router = express.Router();

/* GET users listing. */
router.post('/register',upload.single('photo'),async(req,res)=>{
  console.log(req.file)
  try {
    const {fullname,email,password,role,phone} = req.body;
    if(!fullname) return res.json({success:false,message:"Fullname is required"});
    if(!email) return res.json({success:false,message:"Email is required"});
    if(!password) return res.json({success:false,message:"Password is required"});
    if(!role) return res.json({success:false,message:"Role is required"});
    if(!phone) return res.json({success:false,message:"Phone is required"});
    if(password.length < 4) return res.json({success:false,message:"Please provide atleast 4 digits of password!!"})
    if(phone.length < 10 || phone.length > 10) return res.json({success:false,message:"Please enter only 10 digits for phone!!"})
    const existingUser = await usersModel.findOne({email});
    if(existingUser) return res.json({success:false,message:"User with this email already exists!!"});
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(password,salt,async(err,hash)=>{
        const user = await usersModel.create({
          fullname,
          email,
          password:hash,
          phone,
          role,
          photo:req.file?.filename?req.file.filename:""
        });
        res.json({success:true,message:"User registered successfully!!"})
      })
    })
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error});
  }
})
router.post('/login',async(req,res)=>{
  try {
    const {email,password,role} = req.body;
    if(!email || !password || !role) return res.json({success:false,message:"Please provide complete details"});
    const user = await usersModel.findOne({email});
    if(!user) return res.json({success:false,message:"User with this email doesn't exist"});
    const rolee = user.role;
    if(user.role != role) return res.json({success:false,message:"Role didn't matched!!"});
    bcrypt.compare(password,user.password,async(error,result)=>{
      if(result){
        const tokken =await token(user);
        return res.cookie("token",tokken).json({success:true,message:"User Logged In Successfully!!",tokken,rolee,user});
      }
      else{
        res.json({success:false,message:"Email or password is incorrect"});
      }
    })
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error});
  }
})
router.get('/logout',check,async(req,res)=>{
  try {
    res.cookie("token","").json({success:true,message:"User Logged Out Successfully!!"});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error});
  }
})
router.post('/forgotpassword',async(req,res)=>{
  try {
    const {email,newpassword} = req.body;
    if(!email || !newpassword) return res.json({success:false,message:"Please provide complete info!!"});
    const user = await usersModel.findOne({email});
    if(!user) return res.json({success:false,message:"Email doesn't exist!!"});
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(newpassword,salt,async(err,hash)=>{
        const updatedUser = await usersModel.findOneAndUpdate({email},{password:hash},{new:true});
        updatedUser? res.json({success:true,message:"Password updated successfully!!"}):res.json({success:false,message:"Unable to update the password!!"});
      })
    })
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error});
  }
})
router.post('/updateprofile',check2,upload.single('photo'),async(req,res)=>{
  let {fullname,email,role,bioo,phone,skills} = req.body;
  // console.log(req.body)
  // console.log("fullname",fullname)
  try {
    let phonee = phone.toString();
    // console.log(phonee.length)
    const user = await usersModel.findOne({email:req.user.email});
    if(!user) return res.json({success:false,message:"Unable to get a user!!"});
    if(phonee.length < 10 || phonee.length > 10) return res.json({success:false,message:"Please enter only 10 digits no.!!"});
    // const biooo = user?.profile.bio
    phonee = Number(phone)
    const updatedUser = await usersModel.findOneAndUpdate({email:user.email},{email:email,fullname:fullname,role:role,phone:Number(phonee),$set:{"profile.bio":bioo,"profile.skills":skills}},{new:true});
    updatedUser? res.json({success:true,message:"User's profile updated successfully!!",updatedUser}):res.json({success:false,message:"Unable to update user's profile!!"});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error});
  }
})
router.get('/profile',check,async(req,res)=>{
  try {
    const user = await usersModel.findOne({_id:req.user._id}).select("-password");
    if(!user) return res.json({success:false,message:"Unable to get a user"});
    return res.json({success:true,message:user});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error});
  }
})
module.exports = router;
