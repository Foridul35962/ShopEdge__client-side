import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHome = () => {
    const navigate = useNavigate()
    const orders = [
        {
            _id: 123,
            user: {
                name: "Forid"
            },
            totalPrice: 110,
            status: "Processing"
        },
        {
            _id: 156487,
            user: {
                name: "Foridul"
            },
            totalPrice: 550,
            status: "Processing"
        },
        {
            _id: 1273,
            user: {
                name: "Fahad"
            },
            totalPrice: 567,
            status: "Processing"
        }
    ]
    return (
        <div className='px-5 sm:px-10 py-5 w-full'>
            <div className='flex flex-col gap-2.5 w-full'>
                <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
                <div className='w-full flex flex-col sm:flex-row gap-2'>
                    <div className='flex flex-col w-full px-3 py-2 bg-gray-200 rounded-xl shadow-xl'>
                        <p className='font-black text-lg'>Revenue</p>
                        <p className='text-lg'>$10000</p>
                    </div>
                    <div className='flex flex-col w-full px-3 py-2 bg-gray-200 rounded-xl shadow-xl'>
                        <p className='font-black text-lg'>Total Orders</p>
                        <p className='text-lg'>200</p>
                        <p
                            onClick={() => navigate('/admin/orders')}
                            className='text-sm text-blue-600 hover:underline cursor-pointer'>Manage Orders</p>
                    </div>
                    <div className='flex flex-col w-full px-3 py-2 bg-gray-200 rounded-xl shadow-xl'>
                        <p className='font-black text-lg'>Total Products</p>
                        <p className='text-lg'>100</p>
                        <p
                            onClick={() => navigate('/admin/products')}
                            className='text-sm text-blue-600 hover:underline cursor-pointer'>Manage Products</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2 py-2.5'>
                    <h1 className='font-semibold text-2xl'>Recent Orders</h1>
                    <div className='w-full overflow-scroll sm:overflow-hidden'>
                        <table className='w-full border border-gray-200 rounded-xl shadow-xl'>
                            <thead className='bg-gray-200'>
                                <tr>
                                    <td className="py-3 px-4 text-left font-semibold text-gray-700">ORDER ID</td>
                                    <td className="py-3 px-4 text-left font-semibold text-gray-700">USER</td>
                                    <td className="py-3 px-4 text-left font-semibold text-gray-700">TOTAL PRICE</td>
                                    <td className="py-3 px-4 text-left font-semibold text-gray-700">STATUS</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders?.map((item, idx) => (
                                        <tr
                                            key={idx}
                                            className="border-t border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                                        >
                                            <td className="py-3 px-4 text-gray-700">{item._id}</td>
                                            <td className="py-3 px-4 text-gray-700">{item.user.name}</td>
                                            <td className="py-3 px-4 text-gray-700">{item.totalPrice}</td>
                                            <td className="py-3 px-4 text-gray-700">{item.status}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHome