import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserInfo from '../components/common/UserInfo'
import AllOrders from '../components/cart/AllOrders'

const User = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setisLoggedIn] = useState(true)
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            {
                isLoggedIn &&
                <div className='container mx-auto py-10 w-full flex flex-col md:flex-row gap-5 px-3'>
                    <UserInfo />
                    <AllOrders />
                </div>
            }
        </>
    )
}

export default User