import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createCheckOut, finalizeCheckOut, payCheckOut } from '../../store/slices/checkOutSlice'
import { clearCart } from '../../store/slices/cartSlice'

const CheckOut = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cart, totalPrice, loading, error } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!cart.length > 0) {
            toast.warning('purchase some product')
            navigate('/collections/all')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const checkOutData = {
            checkoutItems: cart,
            shippingAddress: {
                address: e.target.address.value,
                city: e.target.city.value,
                postalCode: e.target.postCode.value,
                country: e.target.country.value
            },
            paymentMethod: 'COD',
            totalPrice: totalPrice
        }

        try {
            // Step-1: Create checkout & receive checkout response directly
            const created = await dispatch(createCheckOut(checkOutData)).unwrap()
            const checkOutId = created?.data?._id

            // created._id ekhane guaranteed thakbe
            const userData = {
                email: e.target.email.value,
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                city: e.target.city.value,
                postCode: e.target.postCode.value,
                country: e.target.country.value,
                phone: e.target.phone.value,
            }

            try {
                // Step-2: Pay
                await dispatch(
                    payCheckOut({
                        checkOutId: checkOutId,
                        paymentStatus: "Paid",
                        paymentDetails: userData
                    })
                ).unwrap()

                // Step-3: Finalize
                await dispatch(finalizeCheckOut(checkOutId)).unwrap()

                toast.success('Checkout completed successfully!')
                dispatch(clearCart())
                navigate('/order-confirmation')

            } catch (message) {
                toast.error(message)
            }
        } catch (message) {
            toast.error(message)
        }
    }


    return (
        <>
            {
                user &&
                <div className='bg-[#dfd7b1] text-black'>
                    <div className='container mx-auto px-5 sm:px-0 py-5'>
                        <h1 className='text-3xl font-bold text-center'>Check Out</h1>
                        <div className='flex w-full flex-col-reverse sm:flex-row gap-10 px-2 sm:px-10'>
                            <div className='flex flex-col gap-3 w-full sm:w-2/5'>
                                <h1 className='text-xl font-semibold'>Contract Details</h1>
                                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-1.5'>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            className='w-full border-2 p-2 rounded-xl'
                                            placeholder='Ex: user@example.com'
                                            type="email"
                                            required
                                            name="email"
                                            id="email" />
                                    </div>
                                    <h1 className='text-xl font-semibold'>Delivery</h1>
                                    <div className='flex flex-col w-full sm:flex-row gap-2'>
                                        <div className='flex flex-col w-full gap-1.5'>
                                            <label htmlFor="firstName">First Name</label>
                                            <input
                                                type="text"
                                                required
                                                className='w-full p-2 border-2 rounded-xl'
                                                name="firstName"
                                                placeholder='Enter your first name'
                                                id="firstName" />
                                        </div>
                                        <div className='flex w-full flex-col gap-1.5'>
                                            <label htmlFor="lastName">Last Name</label>
                                            <input
                                                type="text"
                                                required
                                                className='w-full border-2 rounded-xl p-2'
                                                name="lastName"
                                                placeholder='Enter your last name'
                                                id="lastName" />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1.5'>
                                        <label htmlFor="address">Address</label>
                                        <input
                                            type="text"
                                            required
                                            className='w-full border-2 rounded-xl p-2'
                                            placeholder='Enter your address'
                                            name="address"
                                            id="address" />
                                    </div>
                                    <div className='flex flex-col w-full sm:flex-row gap-2'>
                                        <div className='flex w-full flex-col gap-1.5'>
                                            <label htmlFor="city">City</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder='Ex: Dhaka'
                                                className='w-full border-2 rounded-xl p-2'
                                                name="city"
                                                id="city" />
                                        </div>
                                        <div className='flex w-full flex-col gap-1.5'>
                                            <label htmlFor="postCode">Postal Code</label>
                                            <input
                                                type="number"
                                                required
                                                className='w-full border-2 rounded-xl p-2'
                                                placeholder='Ex: 1100'
                                                name="postCode"
                                                id="postCode" />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1.5'>
                                        <label htmlFor="country">Country</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder='Ex: Bangladesh'
                                            className='w-full border-2 rounded-xl p-2'
                                            name='country'
                                            id='country' />
                                    </div>
                                    <div className='flex flex-col gap-1.5'>
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="number"
                                            className='w-full border-2 rounded-xl p-2'
                                            placeholder='Ex: 01700000000'
                                            required
                                            name="phone"
                                            id="phone" />
                                    </div>
                                    <button type='submit' className='p-2 bg-blue-900 rounded-xl text-white hover:bg-blue-800 transition-all duration-300 mt-2 active:bg-blue-900 cursor-pointer'>Check Out</button>
                                </form>
                            </div>
                            <div className='w-full sm:w-3/5 bg-[#cec9af] rounded-xl py-5 px-2 sm:px-10'>
                                <div className='flex w-full flex-col gap-3'>
                                    <h1 className='text-xl font-semibold'>Order Summary</h1>
                                    <div className='flex flex-col gap-4'>
                                        {
                                            cart.map((product, idx) => (
                                                <div key={idx} className='flex justify-between'>
                                                    <div className='flex gap-3'>
                                                        <img
                                                            className='size-20'
                                                            src={product.image}
                                                            alt="product Image" />
                                                        <div className='flex flex-col gap-0.5'>
                                                            <h3 className='font-semibold'>{product.name}</h3>
                                                            <p>Size: {product.size}</p>
                                                            <p>Color: {product.color}</p>
                                                        </div>
                                                    </div>
                                                    <p className='font-semibold text-lg'>${product.price}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <hr />
                                    <div className='w-full flex justify-between'>
                                        <h3>Subtotal</h3>
                                        <p className='font-semibold'>${Number(totalPrice).toFixed(2)}</p>
                                    </div>
                                    <div className='w-full flex justify-between'>
                                        <h3>Shipping</h3>
                                        <p className='font-semibold'>Free</p>
                                    </div>
                                    <hr />
                                    <div className='w-full flex justify-between'>
                                        <h3>Total</h3>
                                        <p className='font-semibold'>${Number(totalPrice).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CheckOut