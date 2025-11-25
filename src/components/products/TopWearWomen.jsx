import React from 'react'
import ProductGrid from './ProductGrid'

const TopWearWomen = ({products}) => {
    return (
        <div>
            <div className='flex flex-col gap-5'>
                <h1 className='text-3xl font-bold text-center'>Top Wear For Women</h1>
                <ProductGrid products={products} />
            </div>
        </div>
    )
}

export default TopWearWomen