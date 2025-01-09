import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const SingleJob = () => {
  const [jobb,setJobb] = useState();
  const [isApplied,setIsApplied] = useState(false)
  const {id} = useParams()
  const fetchSingleJobDetail = async() => {
    try {
      const {data} = await axios.get(`http://127.0.0.1:5000/job/getjobbyid/${id}`,{headers:{token:localStorage.getItem("token")}});
      console.log(data);
      if(data?.success){
        setJobb(data?.job);
        console.log(data?.job?.applications)
        if(data?.job?.applications.length > 0){
          const isAppliedd = data.job.applications.find((item)=>item === data.userId);
          if(isAppliedd) return setIsApplied(true)
        }
      else{
        setIsApplied(false);
      }
      }
    } catch (error) {
      console.log(error);
    }
  }
  const applyJob = async() => {
    try {
      // console.log(localStorage.getItem("token"))
      const {data} = await axios.post(`http://127.0.0.1:5000/applicants/applyjob/${id}`,{headers:{token:localStorage.getItem("token")}});
      console.log(data);
      if(data.success){
        toast.success(data.message);
        setIsApplied(true);
      }
      else{
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchSingleJobDetail()
  },[])
  return (
    <div>
        <Navbar />
        <Toaster />
        <div className='w-full min-h-screen flex items-center pt-4 flex-col mb-4'>
          <div className='w-[55%] min-h-[100%]'>
            <h1 className='text-5xl text-center font-bold'>Job Detail</h1>
            <div className='mt-4 flex flex-col gap-4 px-3 py-3 pb-2 bg-gray-100 rounded-md shadow-lg'>
              <h5 className='text-2xl font-bold'>Title: <span>{jobb?jobb.title:"Undefined"}</span></h5>
              <h5 className='text-2xl font-bold'>Company Name: <span>{jobb?jobb.company?.name:"Undefined"}</span></h5>
              <h5 className='text-2xl font-bold'>Position: <span>{jobb?jobb.position:"Undefined"}</span></h5>
              <h5 className='text-2xl font-bold'>Salary: <span>₹{jobb?jobb.salary:"Undefined"}</span></h5>
              <h5 className='text-2xl font-bold'>Job Type: <span>{jobb?jobb.jobtype:"Undefined"}</span></h5>
              <h5 className='text-2xl font-bold'>Experience: <span>{jobb?jobb.experience:"Undefined"}</span></h5>
              <h5 className='text-2xl font-bold'>Description: <span>{jobb?jobb.description:"Undefined"}</span></h5>
              <h5 className='text-2xl font-bold'>Requirements: <span>{jobb?jobb.requirements:"Undefined"}</span></h5>
              <h5 className='text-2xl font-bold'>Location: <p className='text-xl inline-block font-semibold'>State:<span>{jobb?jobb.company.location.state:"Undefined"},</span></p> <p className='inline-block text-xl font-semibold'>Nearby:<span>{jobb?jobb.company.location.residence:"Undefined"},</span></p> <p className='inline-block text-xl font-semibold'>Pincode:<span>{jobb?jobb.company.location.pincode:"Undefined"}</span></p><br/></h5>
              <button onClick={()=>applyJob()} className='w-75 my-2 bg-[#683AC2] rounded-full text-white mx-auto py-2'>{isApplied?"Applied":"Apply Job"}</button>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default SingleJob