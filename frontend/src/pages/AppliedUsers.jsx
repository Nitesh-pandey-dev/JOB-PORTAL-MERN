import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AppliedUsers = () => {
  const [appliedUsers,setAppliedUsers] = useState([]);
  const [status,setStatus] = useState("");
  const [userid,setUserid] = useState("");
  const {id} = useParams()
  const fetchAppliedUsers = async()=>{
    try {
      const res = await axios.get(`http://127.0.0.1:5000/applicants/jobsappliedtotal/${id}`,{headers:{token:localStorage.getItem("token")}});
      console.log(res.data);
      if(res?.data?.success){
        setAppliedUsers(res.data.applications);
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleUpdate = async(e) => {
    try {
      console.log("UserId = ",userid)
      setStatus(e.target.value)
      const valuee = await e.target.value;
      const res = await axios.get(`http://127.0.0.1:5000/applicants/updatestatus/${id}`,{headers:{token:localStorage.getItem("token"),statuss:e.target.value,userid}});
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchAppliedUsers()
  },[])
  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="min-h-[75vh] w-full bg-gray-300 py-3 px-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Skills</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {appliedUsers?.map((item,index)=>(
               <tr>
               <th id={index} scope="row">{index+1}</th>
               <td>{item.fullname}</td>
               <td>{item.email}</td>
               <td>{item.phone}</td>
               <td><select><option selected>Skills</option>{item.profile.skills.map((itemm)=>(<option disabled>{itemm}</option>))}</select></td>
               <td onClick={()=>setUserid(item._id)}><select value={status} onChange={handleUpdate}><option value="pending">Pending</option><option value="accept">Accept</option><option value="reject">Reject</option></select></td>
             </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default AppliedUsers;
