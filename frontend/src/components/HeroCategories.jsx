import axios from 'axios';
import React, { useContext } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { AuthContext } from './context/auth';

const HeroCategories = () => {
  const {setAllJobs,allJobs} = useContext(AuthContext);
    const categries = [
        "Frontend Developer",
        "Backend Developer",
        "Fullstack Developer",
        "Dev Ops",
        "Graphic Designer",
        "UI-UX Designer"
    ]
    const handleFilter = async(val) => {
      console.log(val);
      try {
        const res = await axios.get(`http://127.0.0.1:5000/job/filter/${val}`,{headers:{token:localStorage.getItem("token")}});
        console.log(res.data);
        setAllJobs(res?.data?.jobs);
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className='w-[100%] my-10 flex items-center justify-center'>
        <div className='w-[80%] flex px-2 items-center text-center overflow-x-auto scrollbar-hide whitespace-nowrap gap-6'>
        {categries?.map((item,index)=>(
            <button onClick={(e)=>handleFilter(e.target.value)} value={item} className='cursor-pointer rounded-full bg-gray-200 w-[18%] py-3 flex-shrink-0'>{item}</button>
        ))}
        </div>
        <FaArrowRight className='ml-3' />
    </div>
  )
}

export default HeroCategories