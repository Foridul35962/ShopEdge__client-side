import React from 'react'
import ProductGrid from './ProductGrid'

const TopWearWomen = () => {
    const products = [
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
            _id: 1,
            name: 'Product 1',
            price: 110,
            image: [{
                url: "https://picsum.photos/500/500?random=2",
                altText: "Stylish Jacket 1"
            }]
        },
        {
            _id: 1,
            name: 'Product 1',
            price: 110,
            image: [{
                url: "https://picsum.photos/500/500?random=3",
                altText: "Stylish Jacket 1"
            }]
        },
        {
            _id: 1,
            name: 'Product 1',
            price: 110,
            image: [{
                url: "https://picsum.photos/500/500?random=4",
                altText: "Stylish Jacket 1"
            }]
        },
        {
            _id: 1,
            name: 'Product 1',
            price: 110,
            image: [{
                url: "https://picsum.photos/500/500?random=5",
                altText: "Stylish Jacket 1"
            }]
        },
        {
            _id: 1,
            name: 'Product 1',
            price: 110,
            image: [{
                url: "https://picsum.photos/500/500?random=6",
                altText: "Stylish Jacket 1"
            }]
        },
        {
            _id: 1,
            name: 'Product 1',
            price: 110,
            image: [{
                url: "https://picsum.photos/500/500?random=7",
                altText: "Stylish Jacket 1"
            }]
        },
        {
            _id: 1,
            name: 'Product 1',
            price: 110,
            image: [{
                url: "https://picsum.photos/500/500?random=8",
                altText: "Stylish Jacket 1"
            }]
        },

    ]
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