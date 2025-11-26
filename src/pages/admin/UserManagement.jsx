import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAdmin, changeRole, deleteUser, fetchedAllUsers } from '../../store/slices/adminSlice'
import Loading from '../../components/common/Loading'

const UserManagement = () => {
    const dispatch = useDispatch()
    const { users, loading, error } = useSelector((state) => state.admin)

    useEffect(() => {
        dispatch(fetchedAllUsers())
    }, [dispatch])


    const handleAddAdmin = (e) => {
        e.preventDefault()
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            role: 'Admin'
        }
        try {
            dispatch(addAdmin(formData)).unwrap()
            e.target.name.value = ''
            e.target.email.value = ''
            e.target.password.value = ''
        } catch (error) {
            console.log(error);
        }
    }

    const handleRoleChange = (userId, newRole, userName) => {
        if (window.confirm(`Are you sure to change ${userName}'s role?`)) {
            dispatch(changeRole({ userId, newRole }))
        }
    }

    const handleDeleteUser = (userId, userName) => {
        if (window.confirm(`Are you sure to delete ${userName}?`)) {
            dispatch(deleteUser({ userId }))
        }
    }
    return (
        <div className='p-5 sm:px-10 flex flex-col gap-4'>
            <h1 className='text-3xl font-bold'>User Management</h1>
            <div className='flex flex-col gap-2'>
                <h3 className='text-2xl font-semibold'>Add New Admin</h3>
                <form onSubmit={handleAddAdmin}
                    className='w-full flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="name">Name</label>
                        <input
                            className='w-full sm:w-1/2 px-3 py-1 rounded-lg border'
                            placeholder='Ex: John Hoe'
                            type="text"
                            name='name'
                            id='name' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email">Email</label>
                        <input
                            className='w-full sm:w-1/2 px-3 py-1 rounded-lg border'
                            placeholder='Ex: abcd@example.com'
                            type="email"
                            name="email"
                            id="email" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password">Password</label>
                        <input
                            className='w-full sm:w-1/2 px-3 py-1 rounded-lg border'
                            placeholder='Enter your password'
                            type="password"
                            name="password"
                            id="password" />
                    </div>
                    {error && error.flat().map((err, idx) => (
                        <li
                            key={idx}
                            className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm font-medium shadow-sm"
                        >
                            <span className="text-red-600 font-bold">❌</span>
                            {err.msg}
                        </li>
                    ))}
                    <button
                        type='submit'
                        className='w-fit px-3 py-1 bg-green-700 hover:bg-green-800 text-white cursor-pointer rounded-lg transition-all duration-300'
                    >
                        Add Admin
                    </button>
                </form>
            </div>
            {
                loading ? (<Loading />) : users.length > 0 &&
                    <div className='w-full overflow-scroll sm:overflow-hidden'>
                        <table className='w-full border border-gray-200 rounded-xl shadow-xl'>
                            <thead className='bg-gray-200'>
                                <tr>
                                    <td className="py-3 px-4 text-left font-semibold text-gray-700">NAME</td>
                                    <td className="py-3 px-4 text-left font-semibold text-gray-700">EMAIL</td>
                                    <td className="py-3 px-4 text-left font-semibold text-gray-700">ROLE</td>
                                    <td className="py-3 px-4 text-left font-semibold text-gray-700">ACTIONS</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, idx) => (
                                        <tr key={idx}
                                            className="border-t border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                                        >
                                            <td className="py-3 px-4 text-gray-700">{user.name}</td>
                                            <td className="py-3 px-4 text-gray-700">{user.email}</td>
                                            <td className="py-3 px-4 text-gray-700">
                                                <select
                                                    className='cursor-pointer'
                                                    value={user.role}
                                                    onChange={(e) => handleRoleChange(user._id, e.target.value, user.name)}
                                                >
                                                    <option value="customer">Customer</option>
                                                    <option value="admin">Admin</option>
                                                </select>

                                            </td>
                                            <td className="py-3 px-4">
                                                <button
                                                    onClick={() => handleDeleteUser(user._id, user.name)}
                                                    className='bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600'
                                                >Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    )
}

export default UserManagement