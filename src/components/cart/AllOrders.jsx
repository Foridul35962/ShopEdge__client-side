import React from 'react'
import { useNavigate } from 'react-router-dom'

const AllOrders = () => {
    const navigate = useNavigate()
    const orders = [
        {
            _id: '1234',
            created: '07/12/2024',
            shippingAddress: 'New York, USA',
            items: 1,
            price: 100,
            status: 'Paid',
            image: {
                url: 'https://picsum.photos/500/500?random=10',
                altText: 'image'
            }
        },
        {
            _id: '12345',
            created: '07/12/2024',
            shippingAddress: 'New York, USA',
            items: 1,
            price: 100,
            status: 'Delivered',
            image: {
                url: 'https://picsum.photos/500/500?random=11',
                altText: 'image'
            }
        },
        {
            _id: '1234',
            created: '07/12/2024',
            shippingAddress: 'New York, USA',
            items: 1,
            price: 100,
            status: 'Pending',
            image: {
                url: 'https://picsum.photos/500/500?random=12',
                altText: 'image'
            }
        },
    ]

    return (
        <div className='sm:flex-1 w-full bg-white shadow-xl rounded-2xl px-5'>
            {
                orders.length !== 0 ? (
                    <>
                        <h1 className="text-2xl font-bold mb-5">My Orders</h1>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse rounded-xl overflow-hidden shadow">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="p-1 lg:p-3 text-left border-r last:border-r-0">IMAGE</th>
                                        <th className="p-1 lg:p-3 text-left border-r last:border-r-0">ORDER ID</th>
                                        <th className="p-1 lg:p-3 text-left border-r last:border-r-0">CREATED</th>
                                        <th className="p-1 lg:p-3 text-left border-r last:border-r-0">SHIPPING ADDRESS</th>
                                        <th className="p-1 lg:p-3 text-left border-r last:border-r-0">ITEMS</th>
                                        <th className="p-1 lg:p-3 text-left border-r last:border-r-0">PRICE</th>
                                        <th className="p-1 lg:p-3 text-left border-r last:border-r-0">STATUS</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map((item, idx) => (
                                        <tr
                                            key={idx}
                                            className="border-b last:border-b-0 hover:bg-gray-100 transition"
                                        >
                                            <td className="p-1 lg:p-3 border-gray-300 border-r last:border-r-0">
                                                <img
                                                    src={item.image.url}
                                                    alt={item.image.altText || "image"}
                                                    className="w-14 h-14 object-cover rounded-lg"
                                                />
                                            </td>
                                            <td onClick={()=>navigate(`/order-details/${item._id}`)} className="p-1 lg:p-3 border-r border-gray-300 last:border-r-0 cursor-pointer hover:underline">{item._id}</td>
                                            <td className="p-1 lg:p-3 border-r border-gray-300 last:border-r-0">{item.created}</td>
                                            <td className="p-1 lg:p-3 border-r border-gray-300 last:border-r-0">{item.shippingAddress}</td>
                                            <td className="p-1 lg:p-3 border-r border-gray-300 last:border-r-0">{item.items}</td>
                                            <td className="p-1 lg:p-3 border-r border-gray-300 last:border-r-0 font-semibold">${item.price}</td>
                                            <td className="p-1 lg:p-3 border-r border-gray-300 last:border-r-0">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-white text-sm ${
                                                        item.status === "Delivered"
                                                            ? "bg-green-600"
                                                            : item.status === "Pending"
                                                            ? "bg-yellow-600"
                                                            : item.status === "Paid"
                                                            ? "bg-blue-600"
                                                            : "bg-gray-600"
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <h1 className="text-3xl font-semibold text-center">My Order is empty</h1>
                )
            }
        </div>
    )
}

export default AllOrders