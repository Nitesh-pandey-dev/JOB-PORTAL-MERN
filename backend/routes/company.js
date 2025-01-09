var express = require('express');
const companyModel = require('../models/companyModel');
const jobModel = require('../models/jobModel');
const upload = require('../config/multer');
const check2 = require('../middlewares/auth2');
const check = require('../middlewares/auth');
const usersModel = require('../models/usersModel');
var router = express.Router();

router.post('/register',upload.single('photo'),async(req,res)=>{
    try {
        // console.log(req.file)
        const {companyname,city,state,residence,pincode,userid} = req.body;
        // console.log(companyname)
        if(!companyname || !city || !state || !residence || !pincode) return res.json({success:false,message:"Complete info is required!!"});
        const company = await companyModel.findOne({name:companyname});
        if(company) return res.json({success:false,message:"Company name already exists!!"});
        const newCompany = await companyModel.create({
            name:companyname,
            userid:userid,
            location:{
                city:city,
                state:state,
                pincode:pincode,
                residence:residence
            },
            logo:req.file.filename?req.file.filename:""
        });
        newCompany? res.json({success:true,message:"Company registered successfully!!"}):res.json({success:false,message:"Unable to register the company!!"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.get('/userid',check,async(req,res)=>{
    try {
        res.json({success:true,message:req.user._id});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.get('/company',check,async(req,res)=>{
    try {
        const userId = req.user._id;
        const companies = await companyModel.find({userid:userId});
        const user = await usersModel.findOne({email:req.user.email});
        if(!user) return res.json({success:false,message:"Unable to get a user!!"});
        const role = user.role;
        console.log(role)
        if(role == "Employer"){
            const totalCompanies = companies.length 
            if(companies.length < 1) return res.json({success:false,message:"No company is registered till now!!"});
            return res.json({success:true,message:"Companies of the user fetched",totalCompanies,companies});
        }
        else{
            return res.json({success:false,message:"Authorised to only admins!!"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.get('/singlecompany/:id',check,async(req,res)=>{
    try {
        const id = req.params.id;
        const company = await companyModel.findById(id).populate({path:"userid"});
        if(!company) return res.json({success:false,message:"Unable to get company!"});
        return res.json({success:true,message:"Company fetched successfully!!",company});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.get('/updatecompany/:id',async(req,res)=>{
    // console.log(req.headers)
    try {
        let {companyname,city,state,residence,pincode} = req.headers;
        // console.log(companyname)
        const company = await companyModel.findById(req.params.id);
        const statee = state?state:company.location.state;
        const cityy = city?city:company.location.city;
        const residencee = residence?residence:company.location.residence;
        const pincodee = pincode?pincode:company?.location?.pincode;
        const updatecompany = await companyModel.findOneAndUpdate({_id:req.params.id},{name:companyname,location:{city:cityy,state:statee,residence:residencee,pincode:Number(pincodee)}},{new:true});
        updatecompany?res.json({success:true,message:"Company updated successfully!!",updatecompany}):res.json({success:false,message:"Unable to update company"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.get('/yourcreatedjobs',check,async(req,res)=>{
    try {
        const userid = req.user._id;
        if(!userid) return res.json({success:false,message:"Unable to get admin!!"});
        const jobs = await jobModel.find({createdby:userid}).populate({path:'company'});
        if(!jobs) return res.json({success:false,message:"Unable to get admin jobs!!"});
        if(jobs.length < 1) return res.json({success:false,message:"No job created by the admin"});
        return res.json({success:true,message:"Admin Jobs Fetched Successfully!!",jobs});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.get('/search/:id',check,async(req,res)=>{
    try {
        const company = await companyModel.find({name:{$regex:req.params.id,$options:"i"}});
        if(!company) return res.json({success:false,message:"Unable to get a company!!"});
        if(company.length < 1) return res.json({success:false,message:"No Company found with this search"})
        return res.json({success:true,company})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})

module.exports = router;