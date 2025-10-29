import React from 'react'

const Menu = ({ menu, setMenu }) => {
    return (
        <div className={`fixed top-0 left-0 w-2/4 h-full bg-gray-300 dark:bg-gray-800 shadow-2xl transform transition-all duration-300 flex flex-col z-50 ${menu ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col justify-center items-center gap-5 h-full text-black dark:text-white *:cursor-pointer">
                <p>MEN</p>
                <p>WOMEN</p>
                <p>TOP WEAR</p>
                <p>BOTTOM WEAR</p>
            </div>
        </div>
    )
}

export default Menu