import React from 'react'
import featuredImage from '../../assets/featured.webp'
import { useNavigate } from 'react-router-dom'

const FeaturedCollection = () => {
    const navigate = useNavigate()
  return (
    <div className='container py-10 px-5 sm:px-20 lg:px-0 mx-auto'>
        <div className='bg-[#74a892] flex w-full rounded-xl flex-col gap-5 lg:flex-row lg:items-center'>
            <div className='flex flex-col p-8 gap-3 lg:w-1/2'>
                <p className='text-lg font-semibold'>Comfort and Style</p>
                <h1 className='text-4xl font-bold'>Apparel made for <br /> your everyday life</h1>
                <p className='text-lg'>Discover high-quality, comfortable clothing that effortlessly blends fashion and function. Designed to make you look and feel great every day.</p>
                <button onClick={()=>navigate('/collections/all')} className='bg-black cursor-pointer w-fit text-white px-4 lg:px-3 py-2 lg:py-1 rounded-lg hover:bg-gray-900 transition'>Shop Now</button>
            </div>
            <div className='lg:w-1/2'>
                <img className='w-full rounded-br-xl rounded-bl-xl lg:rounded-bl-none lg:rounded-tr-xl' src={featuredImage} alt="featuredImage" />
            </div>
        </div>
    </div>
  )
}

export default FeaturedCollection