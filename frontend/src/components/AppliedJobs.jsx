import axios from "axios";
import React, { useEffect, useState } from "react";

const AppliedJobs = () => {
    const [jobs,setJobs] = useState([]);
    const [status,setStatus] = useState([]);
    const fetchAppliedJobs = async(req,res)=>{
        try {
            const {data} = await axios.get('http://127.0.0.1:5000/job/appliedjobs',{headers:{token:localStorage.getItem("token")}});
            console.log(data)
            if(data.success){
                setJobs(data.appliedJobs);
                setStatus(data.stsArray);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchAppliedJobs()
    },[])
  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold mb-3 text-center">Applied Jobs</h1>
      <div className="flex justify-center py-3 w-full px-10">
        {jobs.length > 0?<>
            <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Company</th>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs?.map((item,index)=>(
                <tr id={index}>
                <th scope="row">{index+1}</th>
                <td>{item?.company?.name}</td>
                <td>{item.title}</td>
                <td className="">{status[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>:<>
        <h2 className="text-2xl text-center"><span className="text-[#F83002]">OOPS!! </span>No Job Applied Till Now!!</h2>
        </>}
      </div>
    </div>
  );
};

export default AppliedJobs;
