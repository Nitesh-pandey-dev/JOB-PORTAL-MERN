import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

const CompanyEdit = () => {
  const [profilee,setProfilee] = useState({});
  const [companyname,setCompanyname] = useState("");
  const [state,setState] = useState("");
  const [city,setCity] = useState("");
  const [residence,setResidence] = useState("");
  const [pincode,setPincode] = useState();
  const [photo,setPhoto] = useState("");
  const {id} = useParams()
    const handleUpdate = async(e) => {
        e.preventDefault();
        // console.log(companyname)
        try {
            const res = await axios.get(`http://127.0.0.1:5000/company/updatecompany/${id}`,{headers:{companyname,pincode,state,city,residence}})
            console.log(res.data);
            if(res.data.success){
              toast.success(res.data.message);
              setCompanyname(res.data.updatecompany.name);
              setState(res.data.updatecompany.state);
              setCity(res.data.updatecompany.city);
              setResidence(res.data.updatecompany.residence);
              setPincode(res.data.updatecompany.pincode);
            }
            else{
              toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getProfile = async() => {
        try {
            const res = await axios.get(`http://127.0.0.1:5000/company/singlecompany/${id}`,{headers:{token:localStorage.getItem("token")}});
            console.log(res.data);
            if(res?.data?.success){
                setProfilee(res?.data?.company);
                setCompanyname(res?.data?.company?.name);
                setState(res?.data?.company?.location?.state);
                setCity(res?.data?.company?.location?.city);
                setResidence(res?.data?.company?.location?.residence);
                setPincode(res?.data?.company?.location?.pincode);
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
            Update Your Company
          </h1>
          <form onSubmit={handleUpdate}>
          <div className="mb-3">
              <label className="form-label font-semibold">
                Company Name
              </label>
              <input
                type="text"
                value={companyname}
                onChange={(e)=>setCompanyname(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label font-semibold">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e)=>setState(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label font-semibold">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label font-semibold">
                Residence
              </label>
              <input
                type="text"
                value={residence}
                onChange={(e)=>setResidence(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label font-semibold">
                Pin Code
              </label>
              <input
                type="number"
                value={pincode}
                onChange={(e)=>setPincode(e.target.value)}
                className="form-control"
              />
            </div>
              <div className='flex items-center gap-4 w-full mb-5'>
              <label className='text-xl mb-2'>Logo Picture:</label>
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

export default CompanyEdit;
