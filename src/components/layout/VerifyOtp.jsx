import React from 'react'
import verifyOtpImg from '../../assets/VerifyOtp.gif'

const VerifyOtp = () => {
    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData = {
            otp : e.target.otp.value
        }
        console.log(formData);
    }
    return (
        <div className='w-full bg-[#61ac8d] py-10 px-2'>
            <div className='container mx-auto px-5 rounded-xl sm:px-0 h-[620px] bg-[#fcfdfd]'>
                <div className='flex flex-col sm:flex-row gap-5 sm:gap-10 h-full w-full items-center'>
                    <img className='w-full h-1/2 sm:h-auto sm:w-1/2' src={verifyOtpImg} alt="verifyImage" />
                    <div className='flex flex-col gap-3 w-full sm:w-1/2 '>
                        <div className='flex flex-col items-center gap-2'>
                            <h1 className='text-4xl font-bold text-center'>OTP Verification</h1>
                            <p>Enter OTP Code sent to your email</p>
                        </div>
                        <form onSubmit={handleSubmit} className='flex w-full justify-center  items-center flex-col gap-3'>
                            <input className='py-1 px-2 sm:w-3/4 border-2 rounded-xl text-center font-sans text-gray-800 tracking-widest font-semibold text-xl' type="number" name='otp' placeholder='Enter Otp' required />
                            <button className='bg-blue-800 px-3 sm:w-3/4 py-2 rounded-xl cursor-pointer text-white ' type='submit'>Verify & Proccess</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtp