import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const [user,setUser] = useState({});
    useEffect(async()=>{
        const role = localStorage.getItem("roleee")
        console.log("user:",role)
        if(role === 'null' || role !== "Employer"){
            navigate('/')
        }
    },[])
  return (
    <>
    {children}
    </>
  )
}

export default ProtectedRoute