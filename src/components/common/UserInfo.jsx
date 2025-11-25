import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const { user } = useSelector((state) => state.auth)
  const {cart} = useSelector((state)=>state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  return (
    <div className='md:w-[200px] lg:w-1/5 w-full p-5 max-h-50 shadow-2xl flex flex-col gap-2 bg-gray-100 rounded-xl'>
      {
        user && (
          <>
            <h1 className='text-3xl font-bold'>{user.name}</h1>
            <p>{user.email}</p>
            <button onClick={() => {dispatch(logoutUser()); navigate('/')}} className='bg-red-500 text-white rounded-xl py-1 px-2 hover:bg-red-600 transform transition-all duration-300 active:bg-red-700 cursor-pointer'>
              Logout
            </button>
          </>
        )
      }
    </div>
  )
}

export default UserInfo