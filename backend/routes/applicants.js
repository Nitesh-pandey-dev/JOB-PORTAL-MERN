var express = require('express');
const check = require('../middlewares/auth');
const check2 = require('../middlewares/auth2');
const jobModel = require('../models/jobModel');
const applicationModel = require('../models/applicationModel');
const usersModel = require('../models/usersModel');
var router = express.Router();

router.post('/applyjob/:id',check2,async(req,res)=>{
    try {
        const userid = req.user._id;
        const jobid = req.params.id;
        const job = await jobModel.findById(jobid);
        if(!job) return res.json({success:false,message:"Unable to get a job!!"});
        const existingApplied = await job.applications.includes(userid);
        if(existingApplied) return res.json({success:true,message:"User already applied for this job!!"});
        // const existingApplication = await applicationModel.findOne({applicant:userid});
        // if(existingApplication) return res.json({success:false,message:"User already applied"});
        const newApplication = await applicationModel.create({
            applicant:userid,
            job:jobid
        });
        const updateJob = await jobModel.findOneAndUpdate({_id:req.params.id},{$push:{applications:userid}},{new:true});
        updateJob && newApplication?res.json({success:true,message:"Job applied successfully!!"}):res.json({success:false,message:"Unable to apply job!!"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.get('/getappliedjobs',check,async(req,res)=>{
    try {
        const appliedJobs = await jobModel.find({applications:req.user._id});
        // console.log(appliedJobs);
        if(appliedJobs.length < 1) return res.json({success:false,message:"No jobs applied till now!!"});
        return res.json({success:true,message:"All applied jobs fetched successfully!!",appliedJobs});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.get('/jobsappliedtotal/:id',check,async(req,res)=>{
    try {
        const job = await jobModel.findById(req.params.id);
        if(!job) return res.json({success:false,message:"Unable to get a job!!"});
        const applicationss = [...job.applications];
        // console.log(applicationss)
        if(applicationss.length < 1) return res.json({success:false,message:"No job application for this job found"});
        const applications = await usersModel.find({_id:applicationss}).select("-password")
        return res.json({success:true,message:"All job applications for this job fetched successfully!!",applications});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})
router.get('/updatestatus/:id',check,async(req,res)=>{
    try {
        // const {status} = req.body;
        // if(!status) return res.json({success:false,message:"Please provide the status!!"});
        // const applicantid = req.params.id;
        // const application = await applicationModel.findById(applicantid);
        // if(!application) return res.json({success:false,message:"Unable to get an application!!"});
        // const updatedApplication = await applicationModel.findOneAndUpdate({_id:req.params.id},{status:status.toLowerCase()},{new:true});
        // updatedApplication? res.json({success:true,message:"Status updated successfully!!",updatedApplication}):res.json({success:false,message:"Unable to update the status!!"});
        const {statuss,userid} = req.headers;
        console.log(statuss,userid)
        if(!statuss || !userid) return res.json({success:false,message:"Please provide the status & UserId!!"});
        const jobId = req.params.id;
        // console.log("JobId: ",jobId)
        const applications = await applicationModel.find({job:jobId});
        // console.log(applications)
        if(applications){
            const updateStatus = await applicationModel.findOneAndUpdate({applicant:userid,job:jobId},{status:statuss},{new:true});
            // console.log(updateStatus)
            return res.json({success:true,message:"Status Updated Successfully!!",updateStatus});
        }
        else{
            return res.json({success:false,message:"Unable to get applications!!"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
})

module.exports = router;
