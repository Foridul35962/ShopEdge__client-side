import React from 'react'
import { FaUserCircle, FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import Searchbar from './Searchbar';

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className='bg-[#e5c185]'>
            <div className='container mx-auto flex justify-between items-center p-2'>
                <div onClick={() => navigate('/')} className='cursor-pointer text-2xl'>
                    ShopEdge
                </div>
                <div className='flex gap-5 *:cursor-pointer'>
                    <p>MEN</p>
                    <p>WOMEN</p>
                    <p>TOP WEAR</p>
                    <p>BOTTUM WEAR</p>
                </div>
                <div className='flex gap-4 items-center text-2xl'>
                    <FaUserCircle className='cursor-pointer' />
                    <div className='relative'>
                        <FaShoppingBag className='cursor-pointer' />
                        <p className='absolute px-1 -top-2 -right-2 text-[16px] bg-red-700 rounded-full'>0</p>
                    </div>
                    <div className='overflow-hidden'>
                        <Searchbar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar