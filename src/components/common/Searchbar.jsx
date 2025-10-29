import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const Searchbar = () => {
  const [searchItem, setSearchItem] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e)=>{
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <div className={`flex justify-center items-center transform transition-all duration-300 ${isOpen ? 'absolute top-0 left-0 z-50 bg-white h-22 dark:bg-gray-800 w-full' : 'w-auto'}`}>
      {
        isOpen ? (
          <form onSubmit={handleSubmit} className='relative flex items-center justify-center w-full'>
            <div className='relative w-1/2'>
              <input type="text" name="search" placeholder='Search Here' value={searchItem} className='w-full bg-gray-300 px-4 py-2 pl-2 pr-12 text-xl rounded-lg focus:outline-none placeholder:text-gray-700' onChange={(e)=>setSearchItem(e.target.value)} onKeyDown={(e)=>e.key==='Enter' && handleSubmit()} />
              <button type='submit' className='cursor-pointer absolute right-1 top-[30%]'>
                <FaSearch />
              </button>
            </div>
            <AiOutlineClose className='cursor-pointer absolute right-3 top-[27%] text-black dark:text-white' onClick={()=>setIsOpen(!isOpen)} />
          </form>
        ) : (
          <button>
            <FaSearch className='cursor-pointer' onClick={()=>setIsOpen(!isOpen)} />
          </button>
        )
      }
    </div>
  )
}

export default Searchbar