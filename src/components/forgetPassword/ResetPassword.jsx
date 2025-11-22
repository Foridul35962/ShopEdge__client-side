import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { resetPassword } from '../../store/slices/authSlice';

const ResetPassword = ({email}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { user, loading, otpSent } = useSelector((state) => state.auth);
    const [errMsg, setErrMsg] = useState("");
    const [error, setError] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            password: e.target.password.value,
            email
        }

        try {
            const res = await dispatch(resetPassword(formData)).unwrap()
            navigate('/login')
        } catch (err) {
            if (err.error.length > 0) {
                setError([err.error])
            }
            setErrMsg(err.message)
        }
    };

    return (
        <div className='container mx-auto py-5 px-5 sm:px-0'>
            <div className='flex flex-col justify-center items-center gap-5 bg-[#74a892] rounded-xl w-full py-10'>

                {/* Form section */}
                <div className='w-full sm:w-1/2 flex flex-col gap-3 text-center px-2 sm:px-10'>
                    <h1 className='text-4xl font-bold'>ShopEdge</h1>
                    <p>Please enter your new Password.</p>

                    <form
                        onSubmit={handleSubmit}
                        className='*:flex *:flex-col *:gap-2 *:text-left flex flex-col gap-5 mt-3'
                    >
                        {error && error.length > 0 && (
                            <ul className="flex flex-col space-y-1 mt-2">
                                {error.flat().map((err, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm font-medium shadow-sm"
                                    >
                                        <span className="text-red-600 font-bold">❌</span>
                                        {err.msg}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div>
                            <label htmlFor="password" className="font-medium">Password</label>
                            <input
                                required
                                className='border-2 bg-[#61ac8d] px-2 py-1 rounded-xl'
                                type="password"
                                name='password'
                                id='password'
                                placeholder='Enter your new password'
                            />
                        </div>

                        {errMsg && (
                            <p className="text-red-600 flex justify-center font-semibold">
                                ❌ {errMsg}
                            </p>
                        )}

                        <button
                            type='submit'
                            className={`w-full py-3 bg-[#254236] text-white font-semibold rounded-lg flex justify-center items-center cursor-pointer hover:bg-[#152921] transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            Submit
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default ResetPassword;