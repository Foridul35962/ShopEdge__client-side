import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserInfo from '../components/common/UserInfo'
import AllOrders from '../components/cart/AllOrders'
import { useSelector } from 'react-redux'

const Orders = () => {
    const {user} = useSelector((state)=>state.auth)
    return (
        <>
            {
                user &&
                <div className='container mx-auto py-10 w-full flex flex-col md:flex-row gap-5 px-3'>
                    <UserInfo />
                    <AllOrders />
                </div>
            }
        </>
    )
}

export default Orders