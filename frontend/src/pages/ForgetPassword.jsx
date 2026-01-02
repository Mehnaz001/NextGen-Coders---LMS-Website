import React, { useState } from 'react'

const ForgetPassword = () => {
    const [step,setStep] = useState(1)
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      {step==1 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
            <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Forget Your Password</h2>
        </div>}
      {step==2 && <div></div>}
      {step==3 && <div></div>}
    </div>
  )
}

export default ForgetPassword
