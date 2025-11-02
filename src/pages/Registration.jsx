import React from 'react'
import RegiImg from '../assets/register.webp'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        console.log(formData);
    }
    return (
        <div className='container mx-auto py-5 px-5 sm:px-0'>
            <div className='flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-20 bg-[#74a892] rounded-xl w-full'>
                <div className='w-full sm:w-1/2 flex flex-col gap-3 text-center px-2 py-5 sm:py-0 sm:px-10'>
                    <h1 className='text-4xl font-bold'>ShopEdge</h1>
                    <p className='text-2xl font-semibold'>Welcome!</p>
                    <p>Please fill in your details to register an account.</p>
                    <form onSubmit={handleSubmit} className='*:flex *:flex-col *:gap-2 *:text-left flex flex-col gap-5'>
                        <div>
                            <label htmlFor="name" className="font-medium">Name</label>
                            <input required className='border-2 bg-[#61ac8d] px-2 py-1 rounded-xl' type="text" name='name' placeholder='Enter your name' id='name' />
                        </div>
                        <div>
                            <label htmlFor="email" className="font-medium">Email</label>
                            <input required className='border-2 bg-[#61ac8d] px-2 py-1 rounded-xl' type="email" name='email' placeholder='Enter your email' id='email' />
                        </div>
                        <div>
                            <label htmlFor="password" className="font-medium">Password</label>
                            <input required className='border-2 bg-[#61ac8d] px-2 py-1 rounded-xl' type="password" name="password" id="password" placeholder='Enter your password' />
                        </div>
                        <button className="w-full py-3 bg-[#254236] text-white font-semibold rounded-lg flex justify-center items-center hover:bg-[#152921] transition" type='submit'>Registration</button>
                    </form>
                    <p>Already have an account? <span
                        className='underline cursor-pointer text-blue-600' onClick={() => navigate('/login')}>Login</span>
                    </p>
                </div>
                <img className='w-full sm:w-1/2 max-h-150 object-cover rounded-br-xl rounded-bl-xl sm:rounded-bl-none sm:rounded-tr-xl' src={RegiImg} alt="RegiImage" />
            </div>
        </div>
    )
}

export default Registration