import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductGrid = ({ products }) => {
    const navigate = useNavigate()
    return (
        <div className='container mx-auto py-5 px-5 sm:px-0'>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                {
                    products.map((product, idx) => (
                        <div
                            onClick={() => navigate(`/product/${product?._id}`)}
                            key={idx}
                            className='hover:scale-105 bg-gray-200 p-3 transition-all duration-300 cursor-pointer rounded-xl'>
                            <img className='max-h-96 rounded-lg' src={product?.images[0]?.url} alt={product?.images[0]?.altText || 'product'} />
                            <p className='text-lg font-bold'>{product?.name}</p>
                            <p>{product?.price}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductGrid