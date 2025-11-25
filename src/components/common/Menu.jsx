import React from 'react'
import { useNavigate } from 'react-router-dom'

const Menu = ({ menu, setMenu }) => {
    const navigate = useNavigate()
    return (
        <div className={`fixed top-0 left-0 w-2/4 h-full bg-gray-300 dark:bg-gray-800 shadow-2xl transform transition-all duration-300 flex flex-col z-50 ${menu ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col justify-center items-center gap-5 h-full text-black dark:text-white *:cursor-pointer">
                <p onClick={()=>{navigate('/collections/all'); setMenu(!menu)}}>MEN</p>
                <p onClick={()=>{navigate('/collections/all?gender=Women'); setMenu(!menu)}}>WOMEN</p>
                <p onClick={()=>{navigate('/collections/all?category=Top+Wear'); setMenu(!menu)}}>TOP WEAR</p>
                <p onClick={()=>{navigate('/collections/all?Bottom+Wear'); setMenu(!menu)}}>BOTTOM WEAR</p>
            </div>
        </div>
    )
}

export default Menu