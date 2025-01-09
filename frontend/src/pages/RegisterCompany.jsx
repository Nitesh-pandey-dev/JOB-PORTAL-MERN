import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import toast, { Toaster } from 'react-hot-toast'
import {useNavigate} from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';

const RegisterCompany = () => {
    const navigate = useNavigate();
  const [companyname,setCompanyname] = useState("");
  const [state,setState] = useState("");
  const [city,setCity] = useState("");
  const [residence,setResidence] = useState("");
  const [userid,setUserid] = useState("");
  const [pincode,setPincode] = useState();
  const [photo,setPhoto] = useState("");
  const handleRegister = async(e) => {
    e.preventDefault();
    try {
        const productData = new FormData();
      productData.append("companyname",companyname)
      productData.append("state",state)
      productData.append("city",city)
      productData.append("residence",residence)
      productData.append("pincode",pincode)
      productData.append("userid",userid)
      productData.append("photo",photo)
      console.log(photo)
        const {data} = await axios.post('http://127.0.0.1:5000/company/register',productData);
        console.log(data)
        if(data.success){
            toast.success(data.message);
            navigate('/admin/companies')
        }
        else{
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error);
    }
  }
  const userId = async() =>{
    try {
        const {data} = await axios.get('http://127.0.0.1:5000/company/userid',{headers:{token:localStorage.getItem("token")}});
        if(data.success){
            setUserid(data.message);
        }
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(()=>{
    userId();
  },[])
  return (
    <div>
        <Navbar />
        <Toaster />
        <div className='my-2 mb-5'>
        <form onSubmit={handleRegister} action="">
            <h1 className='text-center text-[#F83002] font-bold my-4 text-5xl'>Register</h1>
            <div className='flex flex-col justify-center items-center w-full'>
              <div className='w-[600px]'>
              <div className='flex justify-center flex-col w-full mb-2'>
              <label className='text-xl mb-2'>Company Name:</label>
              <input className='px-2 border-none w-[600px] rounded-md' required value={companyname} onChange={(e)=>setCompanyname(e.target.value)} style={{border:"2px solid grey"}} type="text" placeholder='Company Name' />
              </div>
              <div className='flex justify-center flex-col w-full mb-2'>
              <label className='text-xl mb-2'>Pin Code:</label>
              <input className='px-2 border-none w-[600px] rounded-md' required value={pincode} onChange={(e)=>setPincode(e.target.value)} style={{border:"2px solid grey"}} type="number" placeholder='Pin Code' />
              </div>
              <div className='flex justify-center flex-col w-full mb-2'>
              <label className='text-xl mb-2'>State:</label>
              <input className='px-2 border-none w-[600px] rounded-md' required type="text" value={state} onChange={(e)=>setState(e.target.value)} style={{border:"2px solid grey"}} placeholder='State' />
              </div>
              <div className='flex justify-center flex-col w-full mb-2'>
              <label className='text-xl mb-2'>City:</label>
              <input className='px-2 border-none w-[600px] rounded-md' required type="text" value={city} onChange={(e)=>setCity(e.target.value)} style={{border:"2px solid grey"}} placeholder='City' />
              </div>
              <div className='flex justify-center flex-col w-full mb-2'>
              <label className='text-xl mb-2'>Residence:</label>
              <input className='px-2 border-none w-[600px] rounded-md' required type="text" value={residence} onChange={(e)=>setResidence(e.target.value)} style={{border:"2px solid grey"}} placeholder='Residence' />
              </div>
              <div className='flex items-center gap-4 w-full mb-5'>
              <label className='text-xl mb-2'>Company Logo:</label>
              <input className='' onChange={(e)=>setPhoto(e.target.files[0])} type="file" />
              </div>
              <div className='text-center'>
              <button className='w-[200px] bg-red-500 text-white py-1 rounded-md' type='submit'>Register</button>
              </div>
              </div>
            </div>
          </form>
        </div>
        <Footer />
    </div>
  )
}

export default RegisterCompany