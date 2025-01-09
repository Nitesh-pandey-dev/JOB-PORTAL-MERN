import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

const EditJob = () => {
  const [profilee,setProfilee] = useState({});
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [exp,setExp] = useState("");
  const [salary,setSalary] = useState();
  const [job,setJob] = useState("");
  const [position,setPosition] = useState("");
  const [location,setLocation] = useState();
  const {id} = useParams();
    const handleUpdate = async(e) => {
        e.preventDefault();
        // console.log(skills)
        try {
            const res = await axios.get(`http://127.0.0.1:5000/job/updatejob/${id}`,{headers:{token:localStorage.getItem("token"),title,desc,exp,location,salary,job,position}})
            console.log(res.data);
            if(res.data.success){
              toast.success(res.data.message);
            }
            else{
              toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getProfile = async() => {
        try {
            const res = await axios.get(`http://127.0.0.1:5000/job/getjobbyid/${id}`,{headers:{token:localStorage.getItem("token")}});
            console.log(res.data);
            if(res?.data?.success){
                setProfilee(res?.data?.job);
                setTitle(res?.data?.job?.title);
                setDesc(res?.data?.job?.description);
                setExp(res?.data?.job?.experience);
                setSalary(res?.data?.job?.salary);
                setLocation(res?.data?.job?.location);
                setJob(res?.data?.job?.jobtype);
                setPosition(res?.data?.job?.position);
            }
            else{
                toast.error("Unable to get profile")
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
      getProfile()
    },[])
  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="w-full flex justify-center py-4 min-h-[80vh]">
        <div className="w-[50%] shadow-lg px-3 py-3">
          <h1 className="text-3xl font-semibold text-center my-1">
            Update Your Job
          </h1>
          <form onSubmit={handleUpdate}>
          <div className="mb-3">
              <label className="form-label font-semibold">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label font-semibold">
                Description
              </label>
              <input
                type="text"
                value={desc}
                onChange={(e)=>setDesc(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label font-semibold">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label font-semibold">
                Salary
              </label>
              <input
                type="number"
                value={salary}
                onChange={(e)=>setSalary(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label font-semibold">
                Position
              </label>
              <input
                type="number"
                value={position}
                onChange={(e)=>setPosition(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label font-semibold">
                Job Type
              </label>
              <input
                type="text"
                value={job}
                onChange={(e)=>setJob(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label font-semibold">
                Experience
              </label>
              <input
                type="text"
                value={exp}
                onChange={(e)=>setExp(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="w-full flex justify-center items-center my-4">
            <button type="submit" className="w-25 btn btn-primary">
              Update
            </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditJob;
