import React from 'react'
import Home from './pages/home'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import {ToastContainer} from 'react-toastify'
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from "react-redux";
import Profile from './pages/Profile'
import ForgetPassword from './pages/ForgetPassword'

export const serverUrl = "http://localhost:8000"
const App = () => {
  getCurrentUser();
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
      </Routes>

    </>
  )
}

export default App
