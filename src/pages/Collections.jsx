import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa';
import ProductGrid from '../components/products/ProductGrid';
import Filter from '../components/filters/Filter';
import SortOptions from '../components/filters/SortOptions';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchedProductByFilter } from '../store/slices/productSlice';
import Lottie from 'lottie-react'
import Error404 from '../assets/No-Data.json'

const Collections = () => {
    // const [products, setProducts] = useState([])
    const { collection } = useParams()
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const { products, loading, error } = useSelector((state) => state.product)
    const queryParams = Object.fromEntries([...searchParams])

    useEffect(() => {
        dispatch(fetchedProductByFilter({ collection, ...queryParams }))
    }, [dispatch, collection, searchParams])

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
        <div className='px-5 sm:px-0 flex flex-col sm:flex-row gap-0 sm:gap-5 w-full py-5 sm:py-0'>
            <div className='flex flex-col sm:flex-row'>
                <p className='text-3xl sm:hidden font-bold text-center'>All Collections</p>
                <div className='sm:hidden flex justify-between items-center'>
                    <p className='text-2xl font-bold'>Filter</p>
                    <FaFilter ref={filterBtnRef} onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                </div>
            </div>
            <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : '-translate-x-full'} fixed inset-y-0 z-50 left-0 w-auto overflow-hidden sm:w-1/5 bg-gray-800 overflow-y-auto transition-transform duration-300 sm:static shadow-2xl shadow-black sm:-translate-x-5`}>
                <Filter setIsSidebarOpen={setIsSidebarOpen} />
            </div>
            <div className='sm:w-4/5 flex flex-col w-full py-3 sm:pr-5'>
                <p className='text-3xl hidden sm:block font-bold text-center'>All Collections</p>
                <div>
                    <SortOptions />
                </div>
                {                    
                    !products.length>0 ? (
                        <div className='h-100 lg:h-dvh'>
                            <Lottie animationData={Error404} className='h-100 lg:h-dvh'></Lottie>
                        </div>
                    ) : (
                        <ProductGrid products={products} loading={loading} />
                    )
                }
            </div>
        </div>
    )
}

export default Collections