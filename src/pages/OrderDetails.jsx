import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const OrderDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [orderDetail, setOrderDetail] = useState(null)

    useEffect(() => {
        const mockOrderDetails = {
            _id: id,
            createdAt: new Date(),
            isPaid: false,
            isDelivered: false,
            paymentMethod: 'COD',
            shippingMethod: 'Standard',
            shippingAddress: {
                city: 'New York',
                country: 'USA'
            },
            orderItems: [
                {
                    productId: '1',
                    name: "Stylish Jacket",
                    size: "M",
                    color: "Black",
                    price: 120,
                    quantity: 1,
                    image: "https://picsum.photos/150?random=1"
                },
                {
                    productId: '2',
                    name: "Jacket",
                    size: "L",
                    color: "Black",
                    price: 100,
                    quantity: 2,
                    image: "https://picsum.photos/150?random=2"
                },
            ]
        }
        setOrderDetail(mockOrderDetails);

    }, [id])

    if (!orderDetail) return <p>Loading order details...</p>


    return (
        <div className='px-3 sm:px-0 w-full flex py-5 flex-col items-center'>
            <div className='w-full sm:w-2/3'>
                <h1 className='text-center text-3xl font-bold'>Order Details</h1>
                <div className='flex flex-col gap-3 border-2 w-full rounded-xl p-5'>
                    <div className='flex flex-col sm:flex-row gap-2 w-full sm:justify-between'>
                        <div className='flex flex-col'>
                            <h3 className='font-bold'>Order ID: #{orderDetail._id}</h3>
                            <p>{orderDetail.createdAt.toLocaleDateString()}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='bg-green-300 text-center px-2 py-1 rounded-xl'>Approved</p>
                            <p className={`px-2 py-1 rounded-xl ${orderDetail.isDelivered ? 'bg-green-400' : 'bg-amber-200'}`}>{orderDetail.isDelivered ? 'Delivered' : 'Pending Delivery'}</p>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-2 sm:gap-30'>
                        <div className='flex flex-col gap-1.5'>
                            <h3 className='font-bold'>Payment Info</h3>
                            <div className='flex flex-col'>
                                <p>Payment Method: {orderDetail.paymentMethod}</p>
                                <p>Status: {orderDetail.isPaid ? 'Paid' : 'Unpaid'}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <h3 className='font-bold'>Shipping Info</h3>
                            <div className='flex flex-col'>
                                <p>Shipping Method: {orderDetail.paymentMethod}</p>
                                <p>Address: {orderDetail.shippingAddress.city}, {orderDetail.shippingAddress.country}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h3 className='font-bold'>Products</h3>
                        <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden shadow-md">
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
                                {orderDetail.orderItems.map((item, idx) => (
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
                                        <td onClick={()=>navigate(`/product/${item.productId}`)} className="py-3 px-4 font-medium text-gray-800 cursor-pointer hover:underline">{item.name}</td>
                                        <td className="py-3 px-4 text-gray-700">${item.price}</td>
                                        <td className="py-3 px-4 text-gray-700">{item.quantity}</td>
                                        <td className="py-3 px-4 font-semibold text-gray-900">
                                            ${item.price * item.quantity}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h4
                            onClick={() => navigate('/orders')}
                            className='underline text-blue-700 cursor-pointer'>Back to My Order</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails