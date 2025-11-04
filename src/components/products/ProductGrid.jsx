import React from 'react'

const ProductGrid = ({ products }) => {
    return (
        <div className='container mx-auto py-5 px-5 sm:px-0'>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                {
                    products.map((product, idx) => (
                        <div key={idx}>
                            <img className='max-h-96 rounded-lg' src={product.image[0].url} alt={product.image[0].altText || 'product'} />
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductGrid