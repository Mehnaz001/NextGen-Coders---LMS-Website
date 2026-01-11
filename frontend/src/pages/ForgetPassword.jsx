import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from "../App";
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const ForgetPassword = () => {
  const [step, setStep] = useState(1)
  const [email,setEmail] = useState("")
  const [otp,setOtp] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const [conPassword,setConPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  //Step -1
  const sendOTP = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + '/api/auth/sendotp', {email}, {withCredentials:true})
      setLoading(false)
      console.log(result.data)
      setStep(2)
      toast.success(result.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  //step -2
  const verifyOTP = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + '/api/auth/verifyotp', {email,otp}, {withCredentials:true})
      setLoading(false)
      console.log(result.data)
      setStep(3)
      toast.success(result.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  //step-3
  const resetPassword = async() => {
    setLoading(true)
    try {
      if( newPassword != conPassword) {
        toast.error("Password not matched")
      }
      const result = await axios.post(serverUrl + '/api/auth/resetpassword', {email, newPassword}, {withCredentials:true})
      setLoading(false)
      console.log(result.data)
      navigate('/login')
      toast.success(result.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      {step == 1
        &&
        <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
          <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Forget Your Password</h2>
          <form className='space-y-4' onSubmit={(e)=>e.preventDefault()}>
            <div>
              <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Enter your Email address</label>
              <input type="text" id='email' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black' placeholder='you@example.com' required onChange={(e)=> setEmail(e.target.value)} value={email} />
            </div>
            <button className='w-full bg-black hover:bg-[#4b4b4b] text-white px-4 py-2 rounded-md font-medium cursor-pointer' onClick={sendOTP} disabled={loading}>{loading?<ClipLoader size={30} color='white'/>:"Send OTP" }</button>
          </form>
          <div className="text-sm mt-4 text-center cursor-pointer" onClick={() => navigate('/login')}>Back to Login</div>
        </div>
      }
      {step == 2
        &&
        <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
          <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Enter OTP </h2>
          <form className='space-y-4' onSubmit={(e)=>e.preventDefault()}>
            <div>
              <label htmlFor="otp" className='block text-sm font-medium text-gray-700'>Please enter the 4-digit code send to your email</label>
              <input type="text" id='otp' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black' placeholder='* * * *' required onChange={(e)=> setOtp(e.target.value)} value={otp}/>
            </div>
            <button className='w-full bg-black hover:bg-[#4b4b4b] text-white px-4 py-2 rounded-md font-medium cursor-pointer ' onClick={verifyOTP} disabled={loading} >{loading? <ClipLoader color='white' size={30}/>: "Verify OTP"} </button>
          </form>
          <div className="text-sm mt-4 text-center cursor-pointer" onClick={() => navigate('/login')}>Back to Login</div>
        </div>
      }
      {step == 3
        &&
        <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
          <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Reset Your Password</h2>
          <p className='text-sm text-gray-500 text-center mb-6'>Enter a new Password to regain access to your account</p>
          <form  onSubmit={(e)=>e.preventDefault()} className='space-y-4'>
            <div>
              <label htmlFor="password" className='block text-sm font-medium text-gray-700'>New Password</label>
              <input type="text" id='password' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black' placeholder='********' required onChange={(e)=> setNewPassword(e.target.value)} value={newPassword} />
            </div>
            <div>
              <label htmlFor="conpassword" className='block text-sm font-medium text-gray-700'>Confirm Password</label>
              <input type="text" id='conpassword' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black' placeholder='********' required onChange={(e)=> setConPassword(e.target.value)} value={conPassword} />
            </div>
            <button className='w-full bg-black hover:bg-[#4b4b4b] text-white px-4 py-2 rounded-md font-medium cursor-pointer' onClick={resetPassword} disabled={loading} >{loading? <ClipLoader color='white' size={30}/>: "Reset Password"} </button>
          </form>
          <div className="text-sm mt-4 text-center cursor-pointer" onClick={() => navigate('/login')}>Back to Login</div>
        </div>
      }

    </div>
  )
}

export default ForgetPassword
