import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeOrderStatus, fetchedAllOrder } from '../../store/slices/orderSlice';
import Loading from '../../components/common/Loading';

const OrderManagement = () => {
    const dispatch = useDispatch()
    const {orders, loading} = useSelector((state)=>state.orders)

    useEffect(()=>{
        dispatch(fetchedAllOrder())
    },[dispatch])

    const handleStatusChange = (orderId, newStatus)=>{
        dispatch(changeOrderStatus({orderId, newStatus}))
    }

    return (
        <div className='p-5 sm:px-10 flex flex-col gap-4'>
            <h1 className='text-3xl font-bold'>Order Management</h1>
            <div className='w-full overflow-scroll sm:overflow-hidden'>
                {
                    loading ? (<Loading/>) : orders.length> 0 &&
                    <table className='w-full border border-gray-200 rounded-xl shadow-xl'>
                    <thead className='bg-gray-200'>
                        <tr>
                            <td className="py-3 px-4 text-left font-semibold text-gray-700">ORDER ID</td>
                            <td className="py-3 px-4 text-left font-semibold text-gray-700">CUSTOMER</td>
                            <td className="py-3 px-4 text-left font-semibold text-gray-700">TOTAL PRICE</td>
                            <td className="py-3 px-4 text-left font-semibold text-gray-700">STATUS</td>
                            <td className="py-3 px-4 text-left font-semibold text-gray-700">ACTIONS</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, idx) => (
                                <tr key={idx}
                                    className="border-t border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                                >
                                    <td className="py-3 px-4 text-gray-700">{order._id}</td>
                                    <td className="py-3 px-4 text-gray-700">{order.user.name}</td>
                                    <td className="py-3 px-4 text-gray-700">{order.totalPrice}</td>
                                    <td>
                                        <select name="status"
                                            onChange={(e)=>handleStatusChange(order._id, e.target.value)}
                                            value={order.status}
                                            id="status"
                                            className='p-1 rounded border cursor-pointer'
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={()=>handleStatusChange(order._id, 'Delivered')}
                                            className='bg-green-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700'
                                        >Mark as Delivered</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                }
            </div>
        </div>
    )
}

export default OrderManagement