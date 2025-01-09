import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='flex justify-between items-center px-6 shadow-lg py-3'>
      <div className='font-bold text-3xl'>Job<span className='text-[#F83002]'>Portal</span></div>
      <div className='text-md text-gray-400 font-bold'>@2024 Your Company.All Right Reserved</div>
      <div className='flex items-center gap-3 text-xl'>
        <FaFacebook className='cursor-pointer text-2xl hover:text-[#F83002]' />
        <FaTwitter className='cursor-pointer text-2xl hover:text-[#F83002]' />
        <FaLinkedin className='cursor-pointer text-2xl hover:text-[#F83002]' />
      </div>
    </div>
  )
}

export default Footer