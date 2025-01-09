import React from 'react'
import LatestJobCards from './LatestJobCards'

const LatestJobs = () => {
  return (
    <div className='pl-32 max-w-7xl'>
        <h1 className='text-4xl mb-4 font-bold'><span className='text-[#683AC2]'>Latest & Top</span> Job Openings</h1>
        <div className='w-full'>
            <LatestJobCards />
        </div>
    </div>
  )
}

export default LatestJobs