import React from 'react'

const OrderConfirmation = () => {
    const checkout = {
        _id: '12322',
        createdAt: new Date(),
        checkoutItems: [
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
        ],
        shippingAddress: {
            address: '123 Fashion Street',
            city: "New York",
            country: 'USA'
        }
    }

    const calculateEstimatedDelivary = (createdAt) => {
        const orderDate = new Date(createdAt)
        orderDate.setDate(orderDate.getDate() + 3)
        return orderDate.toLocaleDateString()
    }

    return (
        <div className='w-full py-10 px-3 bg-gray-200 sm:px-0'>
            <div className='flex flex-col items-center gap-4'>
                <h1 className='text-3xl text-center font-bold text-green-900'>Thank You for Your Order!</h1>
                {
                    checkout &&
                    <div className='p-3 sm:p-5 w-full sm:w-2/3 border-2 rounded-xl'>
                        <div className='flex flex-col gap-1.5 sm:flex-row sm:justify-between sm:items-center'>
                            <div className='flex flex-col gap-0.5'>
                                <p className='font-bold'>Order Id: {checkout._id}</p>
                                <p>Order Date: {checkout.createdAt.toLocaleDateString()}</p>
                            </div>
                            <p className='text-green-600'>Estimated Delivery: {calculateEstimatedDelivary(checkout.createdAt)}</p>
                        </div>
                        <div className='w-full py-8 flex flex-col gap-4'>
                            {
                                checkout.checkoutItems.map((item, idx)=>(
                                    <div key={idx} className='flex justify-between w-full items-center'>
                                        <div className='flex gap-3 items-center'>
                                            <img src={item.image} className='size-20 rounded-xl' alt="item image" />
                                            <div className='flex flex-col gap-0.5'>
                                                <p className='font-bold'>{item.name}</p>
                                                <p>{item.color} | {item.size}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-bold'>${item.price}</p>
                                            <p>Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='flex flex-col sm:flex-row sm:justify-evenly gap-3'>
                            <div className='flex flex-col gap-1'>
                                <p className='font-bold'>Payment</p>
                                <p>Cash On Delivery</p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h3 className='font-bold'>Delivery</h3>
                                <div className='flex flex-col'>
                                    <p>{checkout.shippingAddress.address}</p>
                                    <p>{checkout.shippingAddress.city}, {checkout.shippingAddress.country}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default OrderConfirmation