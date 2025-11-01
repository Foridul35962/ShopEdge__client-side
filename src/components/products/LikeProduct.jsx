import React from 'react'

const LikeProduct = () => {
    const products = [
        {
            _id: 1,
            name: 'Product 1',
            price: 110,
            image:[{
                url: "https://picsum.photos/500/500?random=1",
                altText: "Stylish Jacket 1"
            }]
        },
        {
            _id: 1,
            name: 'Product 1',
            price: 110,
            image:[{
                url: "https://picsum.photos/500/500?random=2",
                altText: "Stylish Jacket 1"
            }]
        },
        {
            _id: 1,
            name: 'Product 1',
            price: 110,
            image:[{
                url: "https://picsum.photos/500/500?random=3",
                altText: "Stylish Jacket 1"
            }]
        },
        {
            _id: 1,
            name: 'Product 1',
            price: 110,
            image:[{
                url: "https://picsum.photos/500/500?random=4",
                altText: "Stylish Jacket 1"
            }]
        },
        
    ]
    return (
        <div className='container mx-auto py-10 px-5 sm:px-0'>
            <div className='flex flex-col gap-5'>
                <h1 className='text-3xl font-bold text-center'>You May Also Like</h1>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                    {
                        products.map((product, idx)=>(
                            <div key={idx}>
                                <img className='max-h-96 rounded-lg' src={product.image[0].url} alt={product.image[0].altText || 'product'} />
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default LikeProduct