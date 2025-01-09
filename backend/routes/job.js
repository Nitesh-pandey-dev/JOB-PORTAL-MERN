var express = require('express');
const check = require('../middlewares/auth');
const check2 = require('../middlewares/auth2');
const jobModel = require('../models/jobModel');
const usersModel = require('../models/usersModel');
const applicationModel = require('../models/applicationModel');
var router = express.Router();

router.post('/jobcreation',check2,async(req,res)=>{
    // console.log(req.body)
    try {
        const {salary,title,description,experience,requirements,location,jobtype,position,companyId} = req.body;
        // console.log(salary)
        if(!salary || !title || !description || !experience || !requirements || !location || !jobtype || !position || !companyId) return res.json({success:false,message:"Please provide complete details for job creation!!"});
        const titlee = title.toUpperCase()
        const job = await jobModel.create({
            title:titlee,
            description,
            salary:Number(salary),
            location,
            jobtype,
            position,
            experience,
            requirements:requirements,
            company:companyId,
            createdby:req.user._id
        });
        job?res.json({success:true,message:"Job created successfully!!"}):res.json({success:false,message:"Unnable to create job!!"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.get('/alljobs',check,async(req,res)=>{
    try {
        // console.log(req.query.keywords);
        const keyword = req.query.keywords || "";
        // console.log(keyword)
        const query = {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }
        // console.log(query)
        const alljobs = await jobModel.find(query).populate({path:"company"}).populate({path:"createdby"}).sort({createdAt:-1});
        if(alljobs.length < 1) return res.json({success:false,message:"No jobs created till now!!"});
        alljobs? res.json({success:true,message:"All jobs fetched successfully!!",alljobs}):res.json({success:false,message:"Unable to get the jobs!!"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.get('/getjobbyid/:id',check,async(req,res)=>{
    try {
        const userid = await usersModel.findOne({_id:req.user._id});
        const userId = userid._id;
        const job = await jobModel.findById(req.params.id).populate({path:"company"});
        if(!job) return res.json({success:false,message:"No job found with the id"});
        return res.json({success:true,message:"Job searched successfully!!",job,userId});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.get('/search/:id',check,async(req,res)=>{
    try {
        const {id} = req.params;
        const jobs = await jobModel.find({title:{$regex:id,$options:"i"}}).populate({path:"company"});
        if(jobs.length < 1) return res.json({success:false,message:"No job matches your search"});
        return res.json({success:true,message:"Job Searched Successfully!!",jobs});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.get('/adminjobs',check,async(req,res)=>{
    try {
        const jobsOfAdmin = await jobModel.find({createdby:req.user._id});
        if(!jobsOfAdmin) return res.json({success:false,message:"Unable to get admin's job!!"});
        if(jobsOfAdmin.length < 1) return res.json({success:false,message:"No job is created by admin!!"});
        return res.json({success:true,message:"All jobs of admin fetched successfully!!",jobsOfAdmin});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.get('/filter/:id',check,async(req,res)=>{
    try {
        const {id} = req.params;
        const idd = id.toUpperCase();
        console.log(idd)
        const jobs = await jobModel.find({title:idd}).populate({path:"company"});
        if(!jobs) return res.json({success:false,message:"Unable to get filtered jobs"});
        return res.json({success:true,message:"All filtered jobs fetched successfully!!",jobs});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.get('/appliedjobs',check,async(req,res)=>{
    try {
        let stsArray = [];
        const appliedJobs = await jobModel.find({applications:req.user._id}).populate({path:"company"}).sort({createdAt:-1});
        // console.log(appliedJobs)
        const status = await applicationModel.find({applicant:req.user._id});
        // console.log(status)
        status.map((item)=>stsArray.push(item.status));
        // console.log(stsArray)
        if(!appliedJobs) return res.json({success:false,message:"No Applied Jobs"});
        return res.json({success:true,message:"All applied jobs fetched successfully!!",appliedJobs,stsArray});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.get('/updatejob/:id',check,async(req,res)=>{
    try {
        // console.log(req.headers)
        const {title,desc,exp,job,position,salary,location} = req.headers;
        const jobb = await jobModel.findOne({_id:req.params.id});
        if(!jobb) return res.json({success:false,message:"Unable to get user!!"});
        const updateJob = await jobModel.findOneAndUpdate({_id:jobb._id},{title:title,description:desc,location:location,salary:salary,position:position,jobtype:job,experience:exp},{new:true});
        updateJob? res.json({success:true,message:"Job Updated Successfully!!",jobb}) : res.json({success:false,message:"Unable to update this job!!"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.delete('/deletejob/:id',check,async(req,res)=>{
    try {
        const job = await jobModel.findOneAndDelete({_id:req.params.id});
        const deleteApplication = await applicationModel.deleteMany({job:req.params.id});
        return res.json({success:true,message:"Job Deleted Successfully!!"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
module.exports = router;
