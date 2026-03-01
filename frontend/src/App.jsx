import React from 'react'
import Home from './pages/home'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import {ToastContainer} from 'react-toastify'
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from "react-redux";
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import AllCourses from './pages/AllCourses'
import ForgetPassword from './pages/ForgetPassword'
import Dashboard from './pages/educator/Dashboard'
import Courses from './pages/educator/Courses'
import CreateCourses from './pages/educator/CreateCourses'
import EditCourses from './pages/educator/EditCourses'
import getCreatorCourse from './customHooks/getCreatorCourse'
import getPublishedCourse from './customHooks/getPublishedCourse'
import CreateLecture from './pages/educator/CreateLecture'
import EditLecture from './pages/educator/EditLecture'
import CourseDetails from './pages/CourseDetails'
import ViewLecture from './pages/ViewLecture'
import MyEnrolledCourses from './pages/MyEnrolledCourses'

export const serverUrl = "http://localhost:8000"
const App = () => {
  getCurrentUser();
  getCreatorCourse()
  getPublishedCourse()
  const {userData} = useSelector(state=>state.user)
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={!userData? <SignUp/>:<Navigate to={'/'}/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={userData?<Profile/>:<Navigate to={'/signup'}/>} />
        <Route path='/forget' element={<ForgetPassword/> }/>
        <Route path='/profile/edit' element={userData?<EditProfile/>:<Navigate to={'/signup'}/>} />
        <Route path='/dashboard' element={userData?.role === "educator"? <Dashboard/>: <Navigate to={'/signup'}/>} />
        <Route path='/courses' element={userData?.role === "educator"? <Courses/>: <Navigate to={'/signup'}/>} />
        <Route path='/createcourse' element={userData?.role === "educator"? <CreateCourses/>: <Navigate to={'/signup'}/>} />
        <Route path='/viewcourses' element={<AllCourses/> }/>
        <Route path="/viewcourse/:courseId" element={<CourseDetails />} />
        <Route path='/editcourse/:courseId' element={userData?.role === "educator"? <EditCourses/>: <Navigate to={'/signup'}/>} />
        <Route path='/createlecture/:courseId' element={userData?.role === "educator"? <CreateLecture/>: <Navigate to={'/signup'}/>} />
        <Route path='/editlecture/:courseId/:lectureId' element={userData?.role === "educator"? <EditLecture/>: <Navigate to={'/signup'}/>} />
        <Route path="/viewlecture/:courseId" element={<ViewLecture/>} />
        <Route path='/mycourses' element={userData?<MyEnrolledCourses/>:<Navigate to={'/signup'}/>} />
      </Routes>

    </>
  )
}

export default App
