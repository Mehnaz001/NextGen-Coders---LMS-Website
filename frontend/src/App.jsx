import React from 'react'
import Home from './pages/home'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/signUp'
import Login from './pages/Login'
import {ToastContainer} from 'react-toastify'
import getCurrentUser from './customHooks/getCurrentUser'

export const serverUrl = "http://localhost:8000"
const App = () => {
  getCurrentUser();
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>

    </>
  )
}

export default App
