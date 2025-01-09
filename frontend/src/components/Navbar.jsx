import React, { useContext, useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import { AuthContext } from './context/auth';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Navbar = () => {
  const {isLogin,setIsLogin} = useContext(AuthContext);
  const [photo,setPhoto] = useState("");
  const [user,setUser] = useState("");
  // console.log(isLogin);
  const navigate = useNavigate();
  const handleLogout = async(e) => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/users/logout',{headers:{token:localStorage.getItem("token")}});
      console.log(res.data);
      if(res.data.success){
        localStorage.removeItem("token");
        localStorage.removeItem("roleee");
        setIsLogin(false);
        toast.success(res.data.message);
        navigate('/login');
      }
      else{
        toast.error("Unable to logout")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getProfile = async() => {
    try {
      const tokkeen = localStorage.getItem("token");
      if(tokkeen){
        setIsLogin(true);
        const res = await axios.get('http://127.0.0.1:5000/users/profile',{headers:{token:localStorage.getItem("token")}});
      console.log(res.data);
      if(res.data.success){
        setPhoto(res?.data?.message?.photo);
        setUser(res?.data?.message?.role);
        console.log("user: ",user)
      }
      }
      else{
        console.log("Login first")
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
      getProfile();
  },[])
  return (
    <>
    <div className="main sticky top-0 left-0 p-3 flex justify-between items-center z-10 bg-black text-white">
    <div className="nav">
            <h1 onClick={()=>{user == "Employee"? navigate('/'):navigate('/admin/companies')}} className='text-2xl cursor-pointer font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
        </div>
        <div className="lists">
            <ul className='flex gap-10'>
               {user == "Employee"?<> <li className='text-xl'><Link to={'/'}>Home</Link></li>
                <li className='text-xl'><Link to={'/jobs'}>Jobs</Link></li></>:<>
                <li className='text-xl'><Link to={'/admin/companies'}>Companies</Link></li>
                <li className='text-xl'><Link to={'/admin/jobs'}>Jobs</Link></li>
                </>}
            </ul>
        </div>
        <div className="btn flex gap-3 items-center">
        {
          isLogin?<button onClick={()=>handleLogout()} className='py-1 px-2 rounded-md text-white text-xl flex items-center gap-1'><IoIosLogOut />Logout</button>:<><Link to={'/register'}><button className='bg-red-600 py-1 px-2 rounded-md text-white'>Register</button></Link>
          <Link to={'/login'}><button className='bg-[#683AC2] py-1 px-2 rounded-md text-white'>Login</button></Link></>
        }
            {isLogin?<div className="profile w-9 h-9 rounded-full ml-3 bg-white cursor-pointer">
              <Link to={'/profile'}><img className='w-full object-cover object-center rounded-full h-full' src={`http://127.0.0.1:5000/uploads/${photo}`} alt="" /></Link>
            </div>:<></>}
        </div>
    </div>
    <Toaster />
    </>
  )
}

export default Navbar