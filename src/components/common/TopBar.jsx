import React from 'react'
import { FaMeta } from 'react-icons/fa6';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className='bg-[#c7522a] text-white'>
      <div className='container mx-auto flex sm:justify-between p-2 items-center'>
        <div className='gap-3 hidden sm:flex'>
          <FaMeta className='cursor-pointer hover:scale-110 hover:text-[#008585] transform transition-all duration-300' />
          <FaInstagram className='cursor-pointer hover:scale-110 hover:text-[#008585] transform transition-all duration-300' />
          <FaFacebook className='cursor-pointer hover:scale-110 hover:text-[#008585] transform transition-all duration-300' />
        </div>
        <div className='flex-1 text-center'>
          We ship worldwide - Fast and reliable Shoping
        </div>
        <div className='hidden sm:block'>
          +8801712-123654
        </div>
      </div>
    </div>
  )
}

export default TopBar