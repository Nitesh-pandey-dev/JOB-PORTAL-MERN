import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { MdEdit } from "react-icons/md";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import AppliedJobs from './AppliedJobs';

const Profile = () => {
    const [profilee,setProfilee] = useState({});
    const getProfile = async() => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/users/profile',{headers:{token:localStorage.getItem("token")}});
            console.log(res.data);
            if(res?.data?.success){
                setProfilee(res.data.message)
            }
            else{
                toast.error("Unable to get profile")
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            getProfile();
        }
    },[])
  return (
    <div className=''>
        <Navbar />
        <Toaster />
        <div className='w-full flex flex-col gap-4 items-center mb-10'>
            <div style={{border:"2px solid gray"}} className='w-75 py-3 mt-5 px-2'>
                <div className='flex justify-between px-2 py-3'>
                    <div className='flex items-center gap-4'>
                        <div className='w-36 h-24 rounded-full overflow-hidden'><img style={{borderRadius:"50%"}} className='w-full h-full object-cover object-center' src={`http://127.0.0.1:5000/uploads/${profilee.photo}`} alt="" /></div>
                        <div className='w-[95%]'>
                            <h2>Full Name: <span>{profilee?.fullname?profilee.fullname:""}</span></h2>
                            <p>{profilee?.profile?.bio?profilee.profile.bio:"No bio"}</p>
                        </div>
                    </div>
                    <div className='p-3'><Link to={'/updateprofile'}><MdEdit className='text-3xl cursor-pointer' /></Link></div>
                </div>
                <h5 className='flex items-center text-lg gap-2'><CgMail className='text-2xl mt-1' /><span>{profilee?.email?profilee.email:"Not defined"}</span></h5>
                <h5 className='flex items-center text-lg mb-3 gap-1'><MdOutlinePermContactCalendar className='text-2xl mt-1' /><span>+91{profilee?.phone?profilee.phone:"Not defined"}</span></h5>
                <h5 className='text-xl font-semibold mb-2'>Skills:</h5>
                <div className='flex mb-4 gap-2 items-center'>
                    {profilee?.profile?profilee.profile.skills.map((item,index)=>(
                        <span className='px-2 py-1 bg-gray-300 text-sm rounded-full'>{item}</span>
                    )):<><span className='px-2 py-1 bg-gray-300 text-sm rounded-full'>No skill</span></>}
                </div>
                <h5 className='inline-block mr-3'>My Resume: </h5><a href="" className='text-blue-500 hover:underline'>Click to check</a>
            </div>
            <AppliedJobs />
        </div>
        <Footer />
    </div>
  )
}

export default Profile