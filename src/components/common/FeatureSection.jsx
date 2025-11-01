import React from 'react'
import { BsHandbag } from 'react-icons/bs';
import { GiRecycle } from 'react-icons/gi';
import { FaCreditCard } from 'react-icons/fa';

const FeatureSection = () => {
    return (
        <div className='container mx-auto px-5 sm:px-0 pb-10'>
            <div className='flex flex-wrap items-center justify-center text-center gap-10 lg:gap-40'>

                <div className='flex flex-col items-center gap-4'>
                    <BsHandbag />
                    <div>
                        <p className='text-lg font-semibold'>FREE INTERNATIONAL SHIPPING</p>
                        <p>On all orders over $100.00</p>
                    </div>
                </div>

                <div className='flex flex-col items-center gap-4'>
                    <GiRecycle />
                    <div>
                        <p className='text-lg font-semibold'>45 DAYS RETURN</p>
                        <p>Money back guarantee</p>
                    </div>
                </div>

                <div className='flex flex-col items-center gap-4'>
                    <FaCreditCard />
                    <div>
                        <p className='text-lg font-semibold'>SECURE CHECKOUT</p>
                        <p>100% secured checkout process</p>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default FeatureSection