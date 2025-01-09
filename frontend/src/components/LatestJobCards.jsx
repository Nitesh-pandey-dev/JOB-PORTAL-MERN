import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom'
import { AuthContext } from './context/auth';

const LatestJobCards = () => {
    const {alljobs,setAllJobs} = useContext(AuthContext);
    const fetchAllJobs = async() => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/job/alljobs',{headers:{token:localStorage.getItem("token")}});
            console.log(res.data);
            if(res.data.success){
                setAllJobs(res.data.alljobs)
            }
            else{
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchAllJobs()
    },[])
  return (
      <div className='grid grid-cols-3 my-5 gap-4'>
      {alljobs?.slice(0,6).map((item,index)=>(
         <div className="card" id={index} style={{width: '19rem'}}>
         <div className="card-body">
           <h3 className="card-title font-bold text-2xl text-center">{item.title}</h3>
           <h5 className=''><span className='font-bold mt-2'>Company Name:</span> {item?.company?.name}</h5>
           <p className="card-text my-3">{item.description}</p>
           <div className='flex items-center justify-between mb-3'>
            <button className='text-xs bg-[#683AC2] text-white rounded-lg p-1'>Position: {item?.position}</button>
            <button className='text-xs bg-[#683AC2] text-white rounded-lg p-1'>Salary: ₹{item?.salary}</button>
            <button className='text-xs bg-[#683AC2] text-white rounded-lg p-1'>Type: {item?.jobtype}</button>
           </div>
           <Link to={`/job/${item._id}`}><button className="btn btn-secondary text-center w-full">View Details</button></Link>
         </div>
       </div>
      ))}
      </div>
  )
}

export default LatestJobCards