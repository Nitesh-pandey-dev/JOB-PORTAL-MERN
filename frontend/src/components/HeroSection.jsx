import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { FaSearch } from "react-icons/fa";
import { AuthContext } from './context/auth';

const HeroSection = () => {
  const {setAllJobs} = useContext(AuthContext);
  const [inputval,setInputVal] = useState("");
  const handleSearch = async()=>{
    try {
      const inputt = inputval.toUpperCase();
      const res = await axios.get(`http://127.0.0.1:5000/job/search/${inputt}`,{headers:{token:localStorage.getItem("token")}});
      console.log(res.data);
      if(res?.data?.success){
        toast.success(res.data.message);
        setInputVal("");
        setAllJobs(res.data.jobs);
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='w-full'>
      <Toaster />
      <div className="head w-full px-5 flex flex-col gap-4 items-center">
      <h2 className='py-2 px-3 text-center my-3 text-3xl rounded-md font-bold text-[#F83002]'>Best Platform For Job <span className='font-bold'>Hunt</span></h2>
      <h1 className='text-5xl font-bold tracking-wide text-center'>Search,Apply & Get<br/>Your <span className='text-[#683AC2]'>Dream</span> Jobs</h1>
      <p className='text-center block text-xl'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga tempora a natus aliquam iste nesciunt debitis?</p>
      <div className='flex justify-between px-4 py-2 w-[40%] shadow-lg border pl-3 border-gray-200 items-center rounded-full gap-4'>
        <input className='w-full border-none outline-none px-2' value={inputval} onChange={(e)=>setInputVal(e.target.value)} type="text" placeholder='Search Your Jobs...' />
        <FaSearch className='text-[#683AC2] cursor-pointer' onClick={()=>handleSearch()} />
      </div>
      </div>
    </div>
  )
}

export default HeroSection