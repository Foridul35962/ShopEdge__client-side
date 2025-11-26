import React, { useState } from 'react'
import { FaUserCircle, FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import Searchbar from './Searchbar';
import CartDrawer from '../cart/CartDrawer';
import { HiMenuAlt2, HiMenuAlt3 } from 'react-icons/hi';
import Menu from './Menu';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const navigate = useNavigate()
    const [menu, setMenu] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const { cart } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)
    const handleOrderPage = () => {
        if (user) {
            navigate('/orders')
        } else {
            navigate('/login')
        }
    }
    return (
        <div className='bg-[#e5c185]'>
            <Menu menu={menu} setMenu={setMenu} />
            <div className='container mx-auto flex justify-between items-center p-2'>
                <div onClick={() => navigate('/')} className='cursor-pointer text-xl sm:text-2xl'>
                    ShopEdge
                </div>
                <div className='sm:flex gap-5 hidden *:cursor-pointer'>
                    <p onClick={() => navigate('/collections/all?gender=Men')}>MEN</p>
                    <p onClick={() => navigate('/collections/all?gender=Women')}>WOMEN</p>
                    <p onClick={() => navigate('/collections/all?category=Top+Wear')}>TOP WEAR</p>
                    <p onClick={() => navigate('/collections/all?category=Bottom+Wear')}>BOTTUM WEAR</p>
                </div>
                <div className='flex gap-2 sm:gap-4 items-center text-2xl'>
                    {
                        user && user.role === 'admin' &&
                        <button
                            onClick={() => navigate('/admin')}
                            className='bg-black text-sm sm:text-lg text-white px-2 text-center cursor-pointer rounded-lg'
                        >
                            Admin
                        </button>
                    }
                    <FaUserCircle onClick={handleOrderPage} className='cursor-pointer' />
                    {
                        user && <div className='relative'>
                            <FaShoppingBag className='cursor-pointer' onClick={() => setDrawer(!drawer)} />
                            <p className='absolute px-1 -top-2 -right-2 text-[16px] bg-red-700 rounded-full'>{cart.length}</p>
                        </div>
                    }
                    <div className='overflow-hidden'>
                        <Searchbar />
                    </div>
                    <div className='sm:hidden' onClick={() => setMenu(!menu)}>
                        {
                            menu ? (<HiMenuAlt2 />) : (<HiMenuAlt3 />)
                        }
                    </div>
                </div>
            </div>
            <CartDrawer drawer={drawer} setDrawer={setDrawer} />
        </div>
    )
}

export default Navbar