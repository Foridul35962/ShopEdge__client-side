import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { FaBoxOpen, FaClipboardList, FaShop, FaUser } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logoutUser } from '../../store/slices/authSlice'
import { clearCart } from '../../store/slices/cartSlice'
import ShopEdgeAdmin from '../../assets/ShopEdgeAdmin.png'

const AdminSidebar = ({ setSidebar }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogOut = () => {
    setSidebar(false)
    dispatch(clearCart())
    dispatch(logoutUser())
    navigate('/')
  }
  return (
    <div className='p-4 h-full min-h-screen flex flex-col gap-3'>
      <img
        className='w-36 pl-5 cursor-pointer'
        src={ShopEdgeAdmin}
        alt="ShopEdge"
        onClick={() => { navigate('/admin'); setSidebar(false) }}
      />
      <div className='flex flex-col gap-1.5'>
        <nav className='flex flex-col gap-2'>
          <NavLink
            className={({ isActive }) => isActive ? 'bg-gray-700 text-white py-3 px-4 rounded-xl flex items-center gap-1' :
              'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-xl flex items-center gap-1'}
            to={'/admin/users'}
            onClick={() => setSidebar(false)}>
            <FaUser />
            <span>Users</span>
          </NavLink>
        </nav>
        <nav className='flex flex-col gap-2'>
          <NavLink
            className={({ isActive }) => isActive ? 'bg-gray-700 text-white py-3 px-4 rounded-xl flex items-center gap-1' :
              'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-xl flex items-center gap-1'}
            to={'/admin/products'}
            onClick={() => setSidebar(false)}>
            <FaBoxOpen />
            <span>Products</span>
          </NavLink>
        </nav>
        <nav className='flex flex-col gap-2'>
          <NavLink
            className={({ isActive }) => isActive ? 'bg-gray-700 text-white py-3 px-4 rounded-xl flex items-center gap-1' :
              'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-xl flex items-center gap-1'}
            to={'/admin/orders'}
            onClick={() => setSidebar(false)}>
            <FaClipboardList />
            <span>Orders</span>
          </NavLink>
        </nav>
        <nav className='flex flex-col gap-2'>
          <NavLink
            className={({ isActive }) => isActive ? 'bg-gray-700 text-white py-3 px-4 rounded-xl flex items-center gap-1' :
              'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-xl flex items-center gap-1'}
            to={'/'}
            onClick={() => setSidebar(false)}>
            <FaShop />
            <span>Shop</span>
          </NavLink>
        </nav>
        <button
          onClick={handleLogOut}
          className='w-full bg-red-500 hover:bg-red-600 text-white py-3 flex gap-1.5 items-center justify-center rounded-xl cursor-pointer'
        >
          <FaSignOutAlt />
          <span>LogOut</span>
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar