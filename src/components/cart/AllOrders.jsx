import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchedAllOrder } from '../../store/slices/orderSlice'
import emptyOrder from '../../assets/empty-cart.png'
import Loading from '../common/Loading'

const AllOrders = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { orders, loading } = useSelector((state) => state.orders)
    console.log(orders);

    useEffect(() => {
        dispatch(fetchedAllOrder())
    }, [dispatch])

    return (
        <div className='sm:flex-1 w-full bg-white shadow-xl rounded-2xl px-5'>
            {
                loading ? (<Loading/>) :
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
                                                    src={item.orderItems[0].image}
                                                    alt={item.orderItems[0].altText || "image"}
                                                    className="w-14 h-14 object-cover rounded-lg"
                                                />
                                            </td>
                                            <td onClick={() => navigate(`/order-details/${item._id}`)} className="p-1 lg:p-3 border-r border-gray-300 last:border-r-0 cursor-pointer hover:underline">{item._id}</td>
                                            <td className="p-1 lg:p-3 border-r border-gray-300 last:border-r-0">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-1 lg:p-3 border-r border-gray-300 last:border-r-0">
                                                {`${item.shippingAddress.address}, ${item.shippingAddress.city}, ${item.shippingAddress.country}`}
                                            </td>
                                            <td className="p-1 lg:p-3 border-r border-gray-300 last:border-r-0">{orders.length}</td>
                                            <td className="p-1 lg:p-3 border-r border-gray-300 last:border-r-0 font-semibold">${item.totalPrice}</td>
                                            <td className="p-1 lg:p-3 border-r border-gray-300 last:border-r-0">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-white text-sm ${item.status === "Delivered"
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
                    <div>
                        <img src={emptyOrder} alt="Cart is empty" />
                    </div>
                )
            }
        </div>
    )
}

export default AllOrders