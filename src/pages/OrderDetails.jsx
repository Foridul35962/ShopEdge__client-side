import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchedOrderDetails } from '../store/slices/orderSlice'
import Loading from '../components/common/Loading'

const OrderDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    const { orderDetails, loading } = useSelector((state) => state.orders)
    
    useEffect(() => {
        dispatch(fetchedOrderDetails(id))
    }, [dispatch])

    return (
        <div className='px-3 sm:px-0 w-full flex py-5 flex-col items-center'>
            <div className='w-full sm:w-2/3'>
                <h1 className='text-center text-3xl font-bold'>Order Details</h1>
                {
                    loading ? (<Loading />) : orderDetails &&
                        <div className='flex flex-col gap-3 border-2 w-full rounded-xl p-5'>
                            <div className='flex flex-col sm:flex-row gap-2 w-full sm:justify-between'>
                                <div className='flex flex-col'>
                                    <h3 className='font-bold'>Order ID: #{orderDetails._id}</h3>
                                    <p>{new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className='flex flex-col sm:items-end gap-2'>
                                    {/* Payment Approved */}
                                    <p className='bg-green-300 w-fit px-2 py-1 rounded-xl'>Approved</p>

                                    {/* Delivery status */}
                                    <p
                                        className={`px-2 py-1 w-fit rounded-xl bg-green-400`}
                                    >
                                        {orderDetails?.status}
                                    </p>
                                </div>

                            </div>
                            <div className='flex flex-col sm:flex-row gap-2 sm:gap-30'>
                                <div className='flex flex-col gap-1.5'>
                                    <h3 className='font-bold'>Payment Info</h3>
                                    <div className='flex flex-col'>
                                        <p>Payment Method: {orderDetails.paymentMethod}</p>
                                        <p>Status: {orderDetails.isPaid ? 'Paid' : 'Unpaid'}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <h3 className='font-bold'>Shipping Info</h3>
                                    <div className='flex flex-col'>
                                        <p>Shipping Method: {orderDetails.paymentMethod}</p>
                                        <p>Address: {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.country}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h3 className='font-bold'>Products</h3>
                                <div className="w-full overflow-x-auto">
                                    <table className="min-w-max w-full border border-gray-200 rounded-xl shadow-md">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Image</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Unit Price</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Quantity</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Total</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {orderDetails.orderItems.map((item, idx) => (
                                                <tr
                                                    key={idx}
                                                    className="border-t border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                                                >
                                                    <td className="py-3 px-4">
                                                        <img
                                                            src={item.image}
                                                            alt="product"
                                                            className="size-12 object-cover rounded-md border"
                                                        />
                                                    </td>
                                                    <td
                                                        onClick={() => navigate(`/product/${item.productId}`)}
                                                        className="py-3 px-4 font-medium text-gray-800 cursor-pointer hover:underline"
                                                    >
                                                        {item.name}
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-700">${item.price}</td>
                                                    <td className="py-3 px-4 text-gray-700">{item.quantity}</td>
                                                    <td className="py-3 px-4 font-semibold text-gray-900">
                                                        ${item.price * item.quantity}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <h4
                                    onClick={() => navigate('/orders')}
                                    className='underline text-blue-700 cursor-pointer'>Back to My Order</h4>
                            </div>
                        </div>}
            </div>
        </div>
    )
}

export default OrderDetails