import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { MdModeEdit } from "react-icons/md";

const SingleCompany = () => {
  const navigate = useNavigate()
    const {id} = useParams();
    // console.log(id)
    const [details,setDestails] = useState();
    const fetchSingleCompany = async() => {
        try {
            const {data} = await axios.get(`http://127.0.0.1:5000/company/singlecompany/${id}`,{headers:{token:localStorage.getItem("token")}});
            console.log(data);
            if(data.success){
                setDestails(data.company)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchSingleCompany();
    },[])
  return (
    <div>
        <Navbar />
        <div className='min-h-[80vh] w-full my-4'>
        <div className='w-full flex items-center pt-4 flex-col mb-4'>
          <div className='w-[55%] min-h-[50%] mb-3'>
            <h1 className='text-5xl text-center font-bold'>Company Detail</h1>
           {details?<>
            <div className='mt-4 flex flex-col gap-4 px-3 py-3 pb-2 bg-gray-100 rounded-md shadow-lg'>
                <div className='flex items-center justify-between px-5 py-2'>
                    <img className='w-[50px] rounded-full h-[48px] object-cover object-center' src={`http://127.0.0.1:5000/uploads/${details.logo}`} alt="" />
                    <MdModeEdit onClick={()=>navigate(`/admin/company/edit/${details._id}`)} className='text-3xl cursor-pointer' />
                </div>
              <h5 className='text-2xl font-bold mt-3'>Company Name: <span className='font-semibold'>{details.name}</span></h5>
              <h5 className='text-2xl font-bold'>Created By: <span className='font-semibold'>{details?.userid?.fullname}</span></h5>
              <h5 className='text-2xl font-bold'>Created At: <span className='font-semibold'>{(details.createdAt).slice(0,10)}</span></h5>
              <h5 className='text-2xl font-bold mb-2'>Location: <p className='text-xl inline-block font-semibold'>State: <span>{details.location.state},</span></p> <p className='inline-block text-xl font-semibold'>City: <span>{details?.location?.city},</span></p> <p className='inline-block text-xl font-semibold'>Nearby: <span>{details?.location?.residence}</span></p><br/></h5>
              <button onClick={()=>navigate(`/createjob/${id}`)} className="px-3 mb-3 w-[200px] ml-[35%] py-2 rounded-md bg-black text-white">Create Job</button>
            </div>
           </>:<><h1 className='text-center text-2xl mt-20'><span className='text-[#F83002]'>OOPS!! </span>Something went wrong.</h1></>}
          </div>
        </div>
        </div>
        <Footer />
    </div>
  )
}

export default SingleCompany