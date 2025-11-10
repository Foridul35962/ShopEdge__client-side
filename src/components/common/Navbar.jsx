import React, { useState } from 'react'
import { FaUserCircle, FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import Searchbar from './Searchbar';
import CartDrawer from '../cart/CartDrawer';
import { HiMenuAlt2, HiMenuAlt3 } from 'react-icons/hi';
import Menu from './Menu';

const Navbar = () => {
    const navigate = useNavigate()
    const [menu, setMenu] = useState(false)
    const [drawer, setDrawer] = useState(false)
    return (
        <div className='bg-[#e5c185]'>
            <Menu menu={menu} setMenu={setMenu} />
            <div className='container mx-auto flex justify-between items-center p-2'>
                <div onClick={() => navigate('/')} className='cursor-pointer text-2xl'>
                    ShopEdge
                </div>
                <div className='sm:flex gap-5 hidden *:cursor-pointer'>
                    <p onClick={()=>navigate('/collections/all')}>MEN</p>
                    <p>WOMEN</p>
                    <p>TOP WEAR</p>
                    <p>BOTTUM WEAR</p>
                </div>
                <div className='flex gap-4 items-center text-2xl'>
                    <FaUserCircle onClick={()=>navigate('/orders')} className='cursor-pointer' />
                    <div className='relative'>
                        <FaShoppingBag className='cursor-pointer' onClick={()=>setDrawer(!drawer)} />
                        <p className='absolute px-1 -top-2 -right-2 text-[16px] bg-red-700 rounded-full'>0</p>
                    </div>
                    <div className='overflow-hidden'>
                        <Searchbar />
                    </div>
                    <div className='sm:hidden' onClick={()=>setMenu(!menu)}>
                        {
                            menu? (<HiMenuAlt2 />) : (<HiMenuAlt3 />)
                        }
                    </div>
                </div>
            </div>
            <CartDrawer drawer={drawer} setDrawer={setDrawer} />
        </div>
    )
}

export default Navbar