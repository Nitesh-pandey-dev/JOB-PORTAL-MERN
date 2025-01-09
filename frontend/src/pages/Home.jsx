import React from 'react'
import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'
import HeroSection from '../components/HeroSection'
import HeroCategories from '../components/HeroCategories'
import LatestJobs from '../components/LatestJobs'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Toaster />
        <HeroSection />
        <HeroCategories />
        <LatestJobs />
        <Footer />
    </div>
  )
}

export default Home