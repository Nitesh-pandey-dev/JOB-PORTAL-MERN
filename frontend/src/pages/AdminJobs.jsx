import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AdminJobs = () => {
  const navigate = useNavigate()
    const [allJobs,setAllJobs] = useState([]);
    const fetchAllAdminJobs = async() => {
        try {
            const {data} =await axios.get('http://127.0.0.1:5000/company/yourcreatedjobs',{headers:{token:localStorage.getItem("token")}});
            console.log(data);
            if(data.success){
                setAllJobs(data.jobs)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async(id) => {
      try {
        const res = await axios.delete(`http://127.0.0.1:5000/job/deletejob/${id}`,{headers:{token:localStorage.getItem("token")}})
        if(res.data.success){
          toast.success(res.data.message);
          fetchAllAdminJobs()
        }
        else{
          toast.error("Unable to delete this job!!");
        }
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
        fetchAllAdminJobs()
    },[])
  return (
    <div>
      <Navbar />
      <Toaster />
      <h1 className="text-center text-5xl my-4 font-semibold">Jobs Created By You</h1>
      <div className="min-h-[75vh] w-full py-4 px-14 overflow-hidden grid grid-cols-3 gap-4">
      {allJobs.length > 0 ? allJobs.map((item,index)=>(
         <div className="card" id={index} style={{width: '19rem',height:"19rem"}}>
         <div className="card-body">
           <h3 className="card-title font-bold text-2xl text-center">{item.title}</h3>
           <h5 className=''><span className='font-bold mt-2'>Company Name:</span> {item?.company?.name}</h5>
           <p className="card-text my-3">{item.description}</p>
           <div className='flex items-center justify-between mb-3'>
            <button className='text-xs bg-[#683AC2] text-white rounded-lg p-1'>Position: {item?.position}</button>
            <button className='text-xs bg-[#683AC2] text-white rounded-lg p-1'>Salary: ₹{item?.salary}</button>
            <button className='text-xs bg-[#683AC2] text-white rounded-lg p-1'>Type: {item?.jobtype}</button>
           </div>
           <div className="flex items-center justify-between px-2 py-1">
           <Link to={`/admin/job/${item._id}`}><button className="bg-blue-600 px-2 py-1 rounded-md text-white text-center">Edit Job</button></Link>
           <button onClick={()=>handleDelete(item._id)} className="bg-red-600 px-2 py-1 rounded-md text-white text-center">Delete Job</button>
           </div>
           <button onClick={()=>navigate(`/admin/applieduser/${item._id}`)} className="w-full bg-slate-600 text-white py-2 px-3 rounded-md mt-3">Check Applied Users</button>
         </div>
       </div>
      )):<div className='flex items-center w-[100vw] justify-center'><h1 className='text-4xl'><span className='text-[#F83002]'>OOPS!!</span> No Job Created Till Now..</h1></div>}
      </div>
      <Footer />
    </div>
  );
};

export default AdminJobs;
