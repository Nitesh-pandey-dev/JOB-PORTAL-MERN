import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [fullname,setFullname] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [phone,setPhone] = useState();
  const [role,setRole] = useState();
  const [photo,setPhoto] = useState();
  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("fullname",fullname)
      productData.append("email",email)
      productData.append("password",password)
      productData.append("role",role)
      productData.append("phone",phone)
      productData.append("photo",photo)
      console.log(photo)
      const res = await axios.post('http://127.0.0.1:5000/users/register',productData);
      // console.log(res.data);
      if(res?.data?.success){
        toast.success(res.data.message);
        navigate('/login')
      }
      else{
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error)
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
    <div className='w-full h-screen'>
        <Navbar />
        <Toaster />
        <div>
          <form onSubmit={handleRegister} action="">
            <h1 className='text-center text-[#F83002] font-bold my-4 text-5xl'>Sign Up</h1>
            <div className='flex flex-col justify-center items-center w-full'>
              <div className='w-[600px]'>
              <div className='flex justify-center flex-col w-full mb-2'>
              <label className='text-xl mb-2'>Fullname:</label>
              <input className='px-2 border-none w-[600px] rounded-md' required value={fullname} onChange={(e)=>setFullname(e.target.value)} style={{border:"2px solid grey"}} type="text" placeholder='Fullname' />
              </div>
              <div className='flex justify-center flex-col w-full mb-2'>
              <label className='text-xl mb-2'>Phone No.:</label>
              <input className='px-2 border-none w-[600px] rounded-md' required value={phone} onChange={(e)=>setPhone(e.target.value)} style={{border:"2px solid grey"}} type="number" placeholder='Phone No.' />
              </div>
              <div className='flex justify-center flex-col w-full mb-2'>
              <label className='text-xl mb-2'>Email:</label>
              <input className='px-2 border-none w-[600px] rounded-md' required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} style={{border:"2px solid grey"}} placeholder='Email' />
              </div>
              <div className='flex justify-center flex-col w-full mb-2'>
              <label className='text-xl mb-2'>Password:</label>
              <input className='px-2 border-none w-[600px] rounded-md' required type="password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{border:"2px solid grey"}} placeholder='Password' />
              </div>
              <div className='flex items-center gap-4 w-full mb-5'>
              <label className='text-xl mb-2'>Role:</label>
              <input className='px-2 border-none rounded-md' type="radio" name='rdio' required value={"Employee"} onChange={(e)=>setRole(e.target.value)} style={{border:"1px solid grey"}} /><p className='inline text-xl'>Employee</p>
              <input className='px-2 border-none rounded-md' type="radio" name='rdio' required value={"Employer"} onChange={(e)=>setRole(e.target.value)} style={{border:"1px solid grey"}} /><p className='inline text-xl'>Employer</p>
              </div>
              <div className='flex items-center gap-4 w-full mb-5'>
              <label className='text-xl mb-2'>Profile Picture:</label>
              <input className='' onChange={(e)=>setPhoto(e.target.files[0])} type="file" />
              </div>
              <div className='text-center'>
              <button className='w-[200px] bg-red-500 text-white py-1 rounded-md' type='submit'>Sign Up</button>
              </div>
              </div>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Register