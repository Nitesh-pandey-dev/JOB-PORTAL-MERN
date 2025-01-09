import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import {Link} from 'react-router-dom'

const AllJobs = () => {
  const categries = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Dev Ops",
    "Graphic Designer",
    "UI-UX Designer",
    "3D Artist",
    "All Jobs"
]
  const [allJobs,setAllJobs] = useState([]);
  const fetchAllJobs = async(req,res)=>{
    try {
      const res = await axios.get('http://127.0.0.1:5000/job/alljobs',{headers:{token:localStorage.getItem("token")}});
      console.log(res.data);
      if(res?.data?.success){
        setAllJobs(res.data.alljobs);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleFilter = async(val) => {
    // console.log(val);
    try {
      if(val == "All Jobs"){
        fetchAllJobs();
      }
      else{
        const res = await axios.get(`http://127.0.0.1:5000/job/filter/${val}`,{headers:{token:localStorage.getItem("token")}});
        console.log(res.data);
        setAllJobs(res?.data?.jobs);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    if(localStorage.getItem("token")){
      fetchAllJobs();
    }
  },[])
  return (
    <>
    <Navbar />
      <div className='w-full flex'>
        <div className='w-[20%] flex items-center flex-col py-2'>
          <h2 className='text-center text-3xl my-3'>Filter Category</h2>
          <div className='flex flex-col gap-4'>
            {categries?.map((item,index)=>(
              <button value={item} onClick={(e)=>handleFilter(e.target.value)} className='bg-gray-300 py-2 px-3 rounded-full'>{item}</button>
            ))}
          </div>
        </div>
        <div className='w-[80%] py-4 px-5 grid grid-cols-3 gap-3'>
        {allJobs.length > 0 ? allJobs.map((item,index)=>(
         <div className="card" id={index} style={{width: '19rem',height:"16rem"}}>
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
      )):<div style={{width:"950px"}} className='flex items-center justify-center'><h1 className='text-4xl'><span className='text-[#F83002]'>OOPS!!</span> No Job Found With This Filter..</h1></div>}
        </div>
    </div>
    <Footer />
    </>
  )
}

export default AllJobs