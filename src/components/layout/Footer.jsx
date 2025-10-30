import React from 'react'
import { FaMeta } from 'react-icons/fa6';
import { FaInstagram, FaFacebookSquare, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='dark:bg-gray-800 dark:text-white'>
            <div className='container mx-auto'>
                <div className='flex flex-col text-center gap-5 sm:gap-0 sm:flex-row justify-evenly py-4'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-semibold text-xl'>Newsletter</h1>
                        <p>Be the first to hear about new products, <br /> exclusive events, and online offers.</p>
                        <p>Sign up and get 10% off your first order.</p>
                        <form className='w-full relative'>
                            <input type="text" placeholder='Enter your message'
                                className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <button type='submit' className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition">Subcribe</button>
                        </form>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-semibold text-xl'>Shop</h1>
                        <ul>
                            <li>Men's Top Wear</li>
                            <li>Women's Top Wear</li>
                            <li>Men's Bottom Wear</li>
                            <li>Women's Bottom Wear</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-semibold text-xl'>Support</h1>
                        <ul>
                            <li>Contact Us</li>
                            <li>About Us</li>
                            <li>FAQs</li>
                            <li>Features</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <h1 className='font-semibold text-xl'>Follow Us</h1>
                        <div className='flex gap-2 justify-center'>
                            <a href="https://business.facebook.com/" target='_blank' className='cursor-pointer'><FaMeta /></a>
                            <a href="https://www.instagram.com/" target='_blank' className='cursor-pointer'><FaInstagram /></a>
                            <a href="https://www.facebook.com/" target='_blank' className='cursor-pointer'><FaFacebookSquare /></a>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='font-semibold'>Call Us</p>
                            <div className='flex gap-1 justify-center'>
                                <FaPhoneAlt />
                                <p>+88017123-45675</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='py-3 text-sm text-center text-gray-400'>
                    <p>@ 2025, CompileTab. All Rights Reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer