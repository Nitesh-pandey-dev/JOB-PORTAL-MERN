import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UpdateProfile = () => {
  const [profilee,setProfilee] = useState({});
  const [fullname,setFullname] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState();
  const [role,setRole] = useState("");
  const [bioo,setBioo] = useState("");
  const [photo,setPhoto] = useState("");
  const [skills,setSkills] = useState([]);
    const handleUpdate = async(e) => {
        e.preventDefault();
        console.log(skills)
        try {
          
          console.log(photo)
            const res = await axios.post('http://127.0.0.1:5000/users/updateprofile',{headers:{token:localStorage.getItem("token")},fullname,email,phone,role,bioo,skills,photo})
            // console.log(res.data);
            if(res.data.success){
              toast.success(res.data.message);
            }
            else{
              toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getProfile = async() => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/users/profile',{headers:{token:localStorage.getItem("token")}});
            console.log(res.data);
            if(res?.data?.success){
                setProfilee(res?.data?.message);
                setFullname(res?.data?.message?.fullname);
                setEmail(res?.data?.message?.email);
                setPhone(res?.data?.message?.phone);
                setRole(res?.data?.message?.role);
                setBioo(res?.data?.message?.profile?.bio);
                setSkills([]);
            }
            else{
                toast.error("Unable to get profile")
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
      getProfile()
    },[])
  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="w-full flex justify-center py-4 min-h-[80vh]">
        <div className="w-[50%] shadow-lg px-3 py-3">
          <h1 className="text-3xl font-semibold text-center my-1">
            Update Your Profile
          </h1>
          <form onSubmit={handleUpdate}>
          <div className="mb-3">
              <label className="form-label font-semibold">
                Fullname
              </label>
              <input
                type="text"
                value={fullname}
                onChange={(e)=>setFullname(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label font-semibold">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label font-semibold">
                Bio
              </label>
              <input
                type="text"
                value={bioo}
                onChange={(e)=>setBioo(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label font-semibold">
                Phone
              </label>
              <input
                type="number"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                className="form-control"
              />
            </div>
            <div className=''>
              <label className='text-xl font-semibold mb-2 mr-3'>Skills:</label>
               <div className="flex flex-wrap items-center w-full mb-5 px-4">
               <input className='px-2 border-none cursor-pointer rounded-md' name="" type="checkbox"  value={"Html"} onChange={(e)=>setSkills([...skills,e.target.value])} style={{border:"1px solid grey"}} /><p className='inline text-lg ml-1 mr-5'>Html</p>
              <input className='px-2 border-none cursor-pointer rounded-md' name="" type="checkbox" value={"Css"} onChange={(e)=>setSkills([...skills,e.target.value])} style={{border:"1px solid grey"}} /><p className='inline text-lg ml-1 mr-5'>Css</p>
              <input className='px-2 border-none cursor-pointer rounded-md' name="" type="checkbox" value={"Javascript"} onChange={(e)=>setSkills([...skills,e.target.value])} style={{border:"1px solid grey"}} /><p className='inline text-lg ml-1 mr-5'>Javascript</p>
              <input className='px-2 border-none cursor-pointer rounded-md' name="" type="checkbox" value={"MySQL"} onChange={(e)=>setSkills([...skills,e.target.value])} style={{border:"1px solid grey"}} /><p className='inline text-lg ml-1 mr-5'>MySQL</p>
              <input className='px-2 border-none cursor-pointer rounded-md' name="" type="checkbox" value={"React Js"} onChange={(e)=>setSkills([...skills,e.target.value])} style={{border:"1px solid grey"}} /><p className='inline text-lg ml-1 mr-5'>React Js</p>
              <input className='px-2 border-none cursor-pointer rounded-md' name="" type="checkbox" value={"Node Js"} onChange={(e)=>setSkills([...skills,e.target.value])} style={{border:"1px solid grey"}} /><p className='inline text-lg ml-1 mr-5'>Node Js</p>
              <input className='px-2 border-none cursor-pointer rounded-md' name="" type="checkbox" value={"Express Js"} onChange={(e)=>setSkills([...skills,e.target.value])} style={{border:"1px solid grey"}} /><p className='inline text-lg ml-1 mr-5'>Express Js</p>
              <input className='px-2 border-none cursor-pointer rounded-md' name="" type="checkbox" value={"Mongo db"} onChange={(e)=>setSkills([...skills,e.target.value])} style={{border:"1px solid grey"}} /><p className='inline text-lg ml-1 mr-5'>Mongo db</p>
              <input className='px-2 border-none cursor-pointer rounded-md' name="" type="checkbox" value={"Go Lang"} onChange={(e)=>setSkills([...skills,e.target.value])} style={{border:"1px solid grey"}} /><p className='inline text-lg ml-1 mr-5'>Go Lang</p>
               </div>
              </div>
            <div className='flex items-center w-full mb-5'>
              <label className='text-xl font-semibold mb-2 mr-3'>Role:</label>
              <input className='px-2 border-none cursor-pointer rounded-md' name="rdioo" type="radio" value={"Employee"} onChange={(e)=>setRole(e.target.value)} style={{border:"1px solid grey"}} /><p className='inline text-xl mr-2 ml-1'>Employee</p>
              <input className='px-2 border-none cursor-pointer rounded-md' name="rdioo" type="radio" value={"Employer"} onChange={(e)=>setRole(e.target.value)} style={{border:"1px solid grey"}} /><p className='inline text-xl ml-1'>Employer</p>
              </div>
              <div className='flex items-center gap-4 w-full mb-5'>
              <label className='text-xl mb-2'>Profile Picture:</label>
              <input className='' onChange={(e)=>setPhoto(e.target.files[0])} type="file" />
              </div>
            <div className="w-full flex justify-center items-center my-4">
            <button type="submit" className="w-25 btn btn-primary">
              Update
            </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateProfile;
