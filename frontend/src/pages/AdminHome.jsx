import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaSearch } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";

const AdminHome = () => {
  const [companies,setCompanies] = useState();
  const [val,setVal] = useState("");
  const navigate = useNavigate();
  const fetchMyCompanies = async() => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/company/company',{headers:{token:localStorage.getItem("token")}});
      console.log(res.data);
      if(res.data.success){
        setCompanies(res.data.companies);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleSearch = async(req,res)=>{
    try {
      const res = await axios.get(`http://127.0.0.1:5000/company/search/${val}`,{headers:{token:localStorage.getItem("token")}});
      // console.log(res.data)
      if(res.data.success){
        setCompanies(res.data.company);
        setVal("");
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchMyCompanies();
  },[])
  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="w-full flex justify-between items-center px-20 py-3 my-3 mb-4">
        <div className="flex px-4 py-2 w-[30%] shadow-lg border pl-3 border-gray-200 items-center rounded-lg gap-1">
          <input
            type="text"
            value={val}
            onChange={(e)=>setVal(e.target.value)}
            placeholder="Search your company"
            className="w-full border-none outline-none px-2"
          />
          <FaSearch onClick={()=>handleSearch()} className="cursor-pointer" />
        </div>
        <div>
          <button onClick={()=>navigate('/admin/register')} className="bg-black text-white px-2 py-2 rounded-lg">
            New Company
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-3 min-h-[60vh] px-20 py-2">
        {companies?<>
          <table className="table text-center text-xl">
          <thead>
            <tr>
              <th scope="col" className="text-left">LOGO</th>
              <th scope="col">NAME</th>
              <th scope="col">DATE</th>
              <th scope="col">State</th>
            </tr>
          </thead>
          <tbody>
            {companies?.map((item)=>(
              <tr className="cursor-pointer" onClick={()=>navigate(`/admin/company/${item._id}`)}>
              <th scope="row" className="text-left"><img className="rounded-full w-[50px] h-[48px] object-cover object-center" src={`http://127.0.0.1:5000/uploads/${item.logo}`} alt="" /></th>
              <td>{item.name}</td>
              <td>{(item.createdAt).slice(0,10)}</td>
              <td>{item.location.state}</td>
            </tr>
            ))}
          </tbody>
        </table>
        </>:<><h1 className="text-center text-3xl mt-36"><span className="text-[#F83002]">OOPS!!</span> No Company Registered.</h1></>}
        {companies?<><p className="text-center text-gray-600">A list of your registered companies</p></>:<></>}
      </div>
      <Footer />
    </div>
  );
};
{/* <select style={{border:"1px solid gray",borderRadius:"10px"}}><option>Pendind</option><option>Accept</option><option>Reject</option></select> */}

export default AdminHome;
