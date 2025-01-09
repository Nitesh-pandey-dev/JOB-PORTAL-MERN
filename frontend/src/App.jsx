import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import SingleJob from './pages/SingleJob'
import AllJobs from './pages/AllJobs'
import Profile from './components/Profile'
import UpdateProfile from './pages/UpdateProfile'
import AdminHome from './pages/AdminHome'
import RegisterCompany from './pages/RegisterCompany'
import SingleCompany from './pages/SingleCompany'
import CompanyEdit from './pages/CompanyEdit'
import AdminJobs from './pages/AdminJobs'
import EditJob from './pages/EditJob'
import AppliedUsers from './pages/AppliedUsers'
import CreateJob from './pages/CreateJob'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin/companies' element={<AdminHome />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/job/:id' element={<SingleJob />} />
        <Route path='/jobs' element={<AllJobs />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/updateprofile' element={<UpdateProfile />} />
        <Route path='/admin/register' element={<RegisterCompany />} />
        <Route path='/admin/company/:id' element={<SingleCompany />} />
        <Route path='/admin/company/edit/:id' element={<CompanyEdit />} />
        <Route path='/admin/jobs/' element={<AdminJobs />} />
        <Route path='/admin/job/:id' element={<EditJob />} />
        <Route path='/admin/applieduser/:id' element={<AppliedUsers />} />
        <Route path='/createjob/:id' element={<CreateJob />} />
      </Routes>
    </div>
  )
}

export default App