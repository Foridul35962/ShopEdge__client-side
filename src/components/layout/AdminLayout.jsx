import React, { useState } from 'react'
import AdminSidebar from '../admin/AdminSidebar'
import { FaBars } from 'react-icons/fa6'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const [sidebar, setSidebar] = useState(false)
  return (
    <div className="flex flex-col w-full">
      <div className='w-full bg-gray-900'>
        <div className='flex justify-between px-3 py-2 text-white'>
          <h1 className="text-xl font-medium">Admin Dashboard</h1>
          <button className="sm:hidden" onClick={() => setSidebar(!sidebar)}>
            <FaBars />
          </button>
        </div>
      </div>
      <div className='flex gap-3 w-full'>
        <div
          className={`bg-gray-800 text-white z-50 w-64 absolute sm:relative transform
        ${sidebar ? "translate-x-0" : "-translate-x-full"} transition-all duration-300 sm:translate-x-0`}>
          <AdminSidebar setSidebar={setSidebar} />
        </div>
        <div className='w-full'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout