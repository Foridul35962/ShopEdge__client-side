import React from 'react'
import { useNavigate } from 'react-router-dom'
import heroImg from '../../assets/rabbit-hero.webp'

const Hero = () => {
    const navigate = useNavigate()
    return (
        <div className='relative w-full h-50 sm:h-120'>
            <img src={heroImg} alt="Hero Image" className='h-full w-full object-cover' />
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black'>
                <h1 className='text-xl sm:text-4xl font-bold mb-2'>Vacation<br />Ready</h1>
                <h3 className='text-sm sm:text-2xl mb-4'>Explore our vacation outfits with fast worldwide shipping</h3>
                <button
                    onClick={() => navigate('/collections/all')} className='bg-white cursor-pointer text-black px-4 sm:px-3 py-2 sm:py-1 rounded-lg hover:bg-gray-200 transition'>
                    Shop Now
                </button>
            </div>
        </div>
    )
}

export default Hero