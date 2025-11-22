import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { resetPasswordRequest } from '../../store/slices/authSlice';

const Design = ({setEmail}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [errMsg, setErrMsg] = useState("");
    const { user, loading, error, otpSent } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email: e.target.email.value
        }
        try {
            const res = await dispatch(resetPasswordRequest(formData)).unwrap()
            setEmail(e.target.email.value)
        } catch (error) {
            setErrMsg(error.message)
        }
    };

    return (
        <div className='container mx-auto py-5 px-5 sm:px-0'>
            <div className='flex flex-col justify-center items-center gap-5 bg-[#74a892] rounded-xl w-full py-10'>

                <div className='w-full sm:w-1/2 flex flex-col gap-3 text-center px-2 sm:px-10'>
                    <h1 className='text-4xl font-bold'>ShopEdge</h1>
                    <p className='text-2xl font-semibold'>Forgot Password?</p>
                    <p>Please enter your email. We'll send you a reset link.</p>

                    <form
                        onSubmit={handleSubmit}
                        className='*:flex *:flex-col *:gap-2 *:text-left flex flex-col gap-5 mt-3'
                    >
                        <div>
                            <label htmlFor="email" className="font-medium">Email</label>
                            <input
                                required
                                className='border-2 bg-[#61ac8d] px-2 py-1 rounded-xl'
                                type="email"
                                name='email'
                                id='email'
                                placeholder='Enter your email'
                            />
                        </div>

                        {errMsg && (
                            <p className="text-red-600 flex justify-center font-semibold">
                                ❌ {errMsg}
                            </p>
                        )}

                        <button
                            type='submit'
                            disabled={loading}
                            className={`w-full py-3 bg-[#254236] text-white font-semibold rounded-lg flex justify-center items-center cursor-pointer hover:bg-[#152921] transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>

                    <p className='mt-2'>
                        Remember your password?{" "}
                        <span
                            className='underline cursor-pointer text-blue-600'
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </span>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Design;