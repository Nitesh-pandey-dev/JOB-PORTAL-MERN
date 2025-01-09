import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'

const Login = () => {
  const navigate = useNavigate();
  const {isLogin,setIsLogin} = useContext(AuthContext);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("");
  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://127.0.0.1:5000/users/login',{email,password,role});
      // console.log(res.data)
      if(res.data.success){
        setIsLogin(true);
        setEmail("");
        setPassword("");
        setRole("");
        // console.log(res.data.user)
        localStorage.setItem("roleee",res.data.rolee);
        // console.log(res?.data?.role)
        if(res.data.rolee == "Employee"){
          toast.success(res.data.message);
        localStorage.setItem("token",res.data.tokken);
        navigate('/');
        }
        else{
          toast.success("Admin Logged In Successfully!!");
          localStorage.setItem("token",res.data.tokken);
          navigate('/admin/companies');
        }
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    const tokenn = localStorage.getItem("token");
    const roolee = localStorage.getItem("roleee");
    console.log(roolee)
    if(tokenn){
      if(roolee == "Employee"){
        navigate('/');
      }
      else{
        navigate('/admin/companies');
      }
    }
  },[])
  return (
    <div>
        <Navbar />
        <Toaster />
        <div>
          <form onSubmit={handleLogin}>
            <h1 className='text-center text-[#F83002] font-bold my-5 text-4xl'>Sign In</h1>
            <div className='flex flex-col justify-center items-center w-full'>
              <div className='w-[600px]'>
              <div className='flex justify-center flex-col w-full mb-6'>
              <label className='text-xl mb-2'>Email:</label>
              <input required className='px-2 border-none w-[600px] rounded-md' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} style={{border:"2px solid grey"}} placeholder='Email' />
              </div>
              <div className='flex justify-center flex-col w-full mb-6'>
              <label className='text-xl mb-2'>Password:</label>
              <input required className='px-2 border-none w-[600px] rounded-md' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{border:"2px solid grey"}} placeholder='Password' />
              </div>
              <div className='flex items-center gap-4 w-full mb-5'>
              <label className='text-xl mb-2'>Role:</label>
              <input required className='px-2 border-none rounded-md' type="radio" id='r1' name='role' value={"Employee"} onChange={(e)=>setRole(e.target.value)} style={{border:"1px solid grey"}} /><label for="r1" className='inline text-xl'>Employee</label>
              <input required className='px-2 border-none rounded-md' type="radio" id='r2' name='role' value={"Employer"} onChange={(e)=>setRole(e.target.value)} style={{border:"1px solid grey"}} /><label for="r2" className='inline text-xl'>Employer</label>
              </div>
              <div className='flex items-center justify-between px-5 my-4'>
              <p className='text-gray-600 cursor-pointer'>Forget Password?</p>
              <a href="/register" className='text-gray-600'>Don't have an account?</a>
              </div>
              <div className='text-center'>
              <button className='w-[350px] bg-red-500 text-white py-1 rounded-lg' type='submit'>Sign In</button>
              </div>
              </div>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Login