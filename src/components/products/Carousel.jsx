import React, { useEffect, useRef, useState } from 'react'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Carousel = () => {
    const products = [
        {
            _id: "1",
            name: "Stylish Jacket",
            price: 120,
            images: [{
                url: "https://picsum.photos/500/500?random=1",
                altText: "Stylish Jacket"
            }]
        },
        {
            _id: "2",
            name: "Stylish Jacket",
            price: 130,
            images: [{
                url: "https://picsum.photos/500/500?random=2",
                altText: "Stylish Jacket"
            }]
        },
        {
            _id: "3",
            name: "Stylish Jacket",
            price: 120,
            images: [{
                url: "https://picsum.photos/500/500?random=3",
                altText: "Stylish Jacket"
            }]
        },
        {
            _id: "4",
            name: "Stylish Jacket",
            price: 120,
            images: [{
                url: "https://picsum.photos/500/500?random=4",
                altText: "Stylish Jacket"
            }]
        },
        {
            _id: "5",
            name: "Stylish Jacket",
            price: 120,
            images: [{
                url: "https://picsum.photos/500/500?random=5",
                altText: "Stylish Jacket"
            }]
        },
        {
            _id: "6",
            name: "Stylish Jacket",
            price: 120,
            images: [{
                url: "https://picsum.photos/500/500?random=6",
                altText: "Stylish Jacket"
            }]
        },
        {
            _id: "7",
            name: "Stylish Jacket",
            price: 120,
            images: [{
                url: "https://picsum.photos/500/500?random=7",
                altText: "Stylish Jacket"
            }]
        },
        {
            _id: "8",
            name: "Stylish Jacket",
            price: 120,
            images: [{
                url: "https://picsum.photos/500/500?random=8",
                altText: "Stylish Jacket"
            }]
        },
    ]

    const scrollRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(false)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)


    const scroll = (direction)=>{
        const scrollAmount = direction === 'left'? -300 : 300
        scrollRef.current.scrollBy({left: scrollAmount, behaviour: 'smooth'})
    }

    const updateScrollButtons = () =>{
        const container = scrollRef.current
        if (container) {
            const leftScroll = container.scrollLeft
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth
            setCanScrollLeft(leftScroll>0)
            setCanScrollRight(rightScrollable)
        }        
    }
    useEffect(()=>{
        const container = scrollRef.current
        if (container) {
            container.addEventListener('scroll', updateScrollButtons)
            updateScrollButtons()
        }
    })

    return (
        <div>
            <div className='flex flex-col gap-1.5 text-center'>
                <h1 className='text-2xl font-bold'>Explore New Arrivals</h1>
                <h3 className='text-sm'>Discover the latest styles straight off the runway, freshly added to keep your wardrabe on the cutting edge of fashion</h3>
            </div>
            <div className='text-2xl flex gap-3 justify-end-safe pr-10 py-3'>
                <button onClick={()=>scroll('left')} disabled={!canScrollLeft} className={canScrollLeft ? 'cursor-pointer hover:scale-105 active:scale-100 transform transition-all duration-300' : 'text-gray-500 cursor-not-allowed'} ><FaArrowAltCircleLeft /></button>
                <button onClick={()=>scroll('right')} disabled={!canScrollRight} className={canScrollRight ? 'cursor-pointer hover:scale-105 active:scale-100 transform transition-all duration-300' : 'text-gray-500 cursor-not-allowed'} ><FaArrowAltCircleRight /></button>
            </div>
            <div ref={scrollRef} className='container mx-auto flex overflow-x-scroll space-x-6 gap-3 py-2'>
                {
                    products.map((product, idx) => (
                        <div key={idx} className='min-w-full sm:min-w-1/2 lg:min-w-1/3 relative'>
                            <img src={product.images[0].url} alt={product.images[0].altText} className='w-full rounded-lg object-cover' />
                            <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-sm text-white p-4 rounded-b-lg'>
                                <Link to={`/product/${product._id}`} className='block'>
                                <h4 className='font-medium'>{product.name}</h4>
                                <p className='mt-1'>${product.price}</p>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Carousel