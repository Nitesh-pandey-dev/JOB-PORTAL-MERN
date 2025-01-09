import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const CreateJob = () => {
    const {id} = useParams();
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [salary,setSalary] = useState();
    const [requirements,setRequirements] = useState("");
    const [jobtype,setJobtype] = useState("");
    const [location,setLocation] = useState("");
    const [experience,setExperience] = useState("");
    const [position,setPosition] = useState();
    const [companyId,setCompanyId] = useState("");
  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
        setCompanyId(id);
      const res = await axios.post("http://127.0.0.1:5000/job/jobcreation", {headers: { token: localStorage.getItem("token") },title,description,salary,requirements,position,jobtype,companyId,location,experience});
    //   console.log(res.data);
      if(res.data.success){
        toast.success(res.data.message);
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <Toaster />
      <h1 className="text-center font-semibold text-4xl my-3">Create Job</h1>
      <div className="min-h-[80vh] w-full flex justify-center items-center py-4">
        <form className="w-50 p-3 rounded-lg shadow-lg" onSubmit={handleCreateJob}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-xl">
              Title of job
            </label>
            <input
              type="text"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-xl">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              className="form-control"
              id=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-xl">
              Salary
            </label>
            <input
              type="number"
              value={salary}
              onChange={(e)=>setSalary(e.target.value)}
              className="form-control"
              id=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-xl">
              Experience
            </label>
            <input
              type="text"
              value={experience}
              onChange={(e)=>setExperience(e.target.value)}
              className="form-control"
              id=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-xl">
              Requirements
            </label>
            <input
              type="text"
              value={requirements}
              onChange={(e)=>setRequirements(e.target.value)}
              className="form-control"
              id=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-xl">
              Position
            </label>
            <input
              type="number"
              value={position}
              onChange={(e)=>setPosition(e.target.value)}
              className="form-control"
              id=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-xl">
              Job Type
            </label>
            <input
              type="text"
              value={jobtype}
              onChange={(e)=>setJobtype(e.target.value)}
              className="form-control"
              id=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-xl">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
              className="form-control"
              id=""
            />
          </div>
          <button type="submit" className="btn btn-primary w-full text-center">
            Create Job
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateJob;
