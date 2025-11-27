import React from 'react'
import MensImage from '../../assets/mens-collection.webp'
import WomensImage from '../../assets/womens-collection.webp'
import { Link } from 'react-router-dom'

const GenderCollectionSection = () => {
    return (
        <div className='flex flex-col sm:flex-row gap-10 py-5 px-10'>
            <div className='relative w-full h-80 sm:h-120'>
                <img src={MensImage} alt="Men Image" className='w-full h-full object-cover' />
                <div className='absolute bg-amber-100 bottom-6 left-6 px-2 py-1'>
                    <h3>Men Collection</h3>
                    <Link to="/collections/all?gender=Men" className='underline text-gray-900' >Shop now</Link>
                </div>
            </div>
            <div className='relative w-full h-80 sm:h-120'>
                <img src={WomensImage} alt="Women Image" className='w-full h-full object-cover' />
                <div className='absolute bg-amber-100 bottom-6 left-6 px-2 py-1'>
                    <h3>Women Collection</h3>
                    <Link to="/collections/all?gender=Women" className='underline text-gray-900' >Shop now</Link>
                </div>
            </div>
        </div>
    )
}

export default GenderCollectionSection