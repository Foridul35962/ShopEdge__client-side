import React from 'react'

const UserInfo = () => {
    const userInformation ={
        name: 'Foridul',
        email: 'foridul@gmail.com'
    }
  return (
    <div className='md:w-[200px] lg:w-1/5 w-full p-5 max-h-50 shadow-2xl flex flex-col gap-2 bg-gray-100 rounded-xl'>
        <h1 className='text-3xl font-bold'>{userInformation.name}</h1>
        <p>{userInformation.email}</p>
        <button className='bg-red-500 text-white rounded-xl py-1 px-2 hover:bg-red-600 transform transition-all duration-300 active:bg-red-700 cursor-pointer'>Logout</button>
    </div>
  )
}

export default UserInfo