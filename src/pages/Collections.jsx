import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa';
import ProductGrid from '../components/products/ProductGrid';
import Filter from '../components/filters/Filter';
import SortOptions from '../components/filters/SortOptions';

const Collections = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchedProducts = [
            {
                _id: 1,
                name: 'Product 1',
                price: 110,
                image: [{
                    url: "https://picsum.photos/500/500?random=1",
                    altText: "Stylish Jacket 1"
                }]
            },
            {
                _id: 2,
                name: 'Product 1',
                price: 110,
                image: [{
                    url: "https://picsum.photos/500/500?random=2",
                    altText: "Stylish Jacket 1"
                }]
            },
            {
                _id: 3,
                name: 'Product 1',
                price: 110,
                image: [{
                    url: "https://picsum.photos/500/500?random=3",
                    altText: "Stylish Jacket 1"
                }]
            },
            {
                _id: 4,
                name: 'Product 1',
                price: 110,
                image: [{
                    url: "https://picsum.photos/500/500?random=4",
                    altText: "Stylish Jacket 1"
                }]
            },
            {
                _id: 5,
                name: 'Product 1',
                price: 110,
                image: [{
                    url: "https://picsum.photos/500/500?random=5",
                    altText: "Stylish Jacket 1"
                }]
            },
            {
                _id: 6,
                name: 'Product 1',
                price: 110,
                image: [{
                    url: "https://picsum.photos/500/500?random=6",
                    altText: "Stylish Jacket 1"
                }]
            },
            {
                _id: 7,
                name: 'Product 1',
                price: 110,
                image: [{
                    url: "https://picsum.photos/500/500?random=7",
                    altText: "Stylish Jacket 1"
                }]
            },
            {
                _id: 8,
                name: 'Product 1',
                price: 110,
                image: [{
                    url: "https://picsum.photos/500/500?random=8",
                    altText: "Stylish Jacket 1"
                }]
            },

        ]
        setProducts(fetchedProducts)
    }, [])


    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    //config for click outside to close filter menu
    const sidebarRef = useRef(null)
    const filterBtnRef = useRef(null)
    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target) && !filterBtnRef.current.contains(e.target)) {
            setIsSidebarOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])


    return (
        <div className='px-5 sm:px-0 flex flex-col sm:flex-row gap-0 sm:gap-5 w-full'>
            <div className='flex flex-col sm:flex-row'>
                <div className='sm:hidden flex justify-between items-center'>
                    <p className='text-2xl font-bold'>Filter</p>
                    <FaFilter ref={filterBtnRef} onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                </div>
            </div>
            <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : '-translate-x-full'} fixed inset-y-0 z-50 left-0 w-auto overflow-hidden sm:w-1/5 bg-gray-800 overflow-y-auto transition-transform duration-300 sm:static shadow-2xl shadow-black sm:-translate-x-5`}>
                <Filter setIsSidebarOpen={setIsSidebarOpen} />
            </div>
            <div className='sm:w-4/5 flex flex-col w-full py-3 sm:pr-5'>
                <p className='text-3xl font-bold text-center'>All Collections</p>
                <div>
                    <SortOptions />
                </div>
                <ProductGrid products={products} />
            </div>
        </div>
    )
}

export default Collections