import React, { useState } from 'react'

const ProductDetails = () => {
    const products = {
        name: 'Stylish Jacket',
        price: 120,
        originalPrice: 150,
        description: "This is a stylish Jacket perfect for any occasion",
        brand: "FashionBrand",
        meterial: "Leather",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Red", "Black"],
        images: [
            {
                url: "https://picsum.photos/500/500?random=1",
                altText: "Stylish Jacket 1"
            },
            {
                url: "https://picsum.photos/500/500?random=2",
                altText: "Stylish Jacket 2"
            },
        ]
    }

    const [viewImage, setViewImage] = useState(products.images[0])
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedSize, setSelectedSize] = useState('')
    const [quantity, setQuantity] = useState(1)

    const handleAddingCart = () => {
        if (!selectedColor || !selectedSize || !quantity) {
            console.log('something is miss');
        }
    }

    return (
        <div className='container mx-auto p-5 sm:px-0'>
            <div className='flex gap-3 md:gap-10 lg:gap-20 flex-col sm:flex-row sm:items-center'>
                <div className='flex flex-col-reverse sm:flex-row gap-3'>
                    <div className='flex sm:flex-col gap-2'>
                        {
                            products.images.map((image, idx) => (
                                <div key={idx} className={`w-20 rounded-lg ${viewImage.url === image.url && "border-3 border-blue-950"}`}>
                                    <img className='w-full rounded-lg cursor-pointer' src={image.url} alt={image.altText || `Thumbnail ${idx}`} onClick={() => setViewImage(image)} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <img className='rounded-lg max-h-200' src={viewImage.url} alt={viewImage.altText || 'image'} />
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xl font-semibold'>{products.name}</h1>
                        <p className='text-lg'>${products.price}</p>
                        <p className='text-sm'>{products.description}</p>
                        <div className='text-sm font-bold'>
                            <p>Color:</p>
                            <div className='flex gap-2 text-sm font-bold'>
                                {products.colors.map((color, idx) => (
                                    <div key={idx} className={`cursor-pointer ${color.toLocaleLowerCase() === selectedColor && 'border-2'}`}
                                        style={{ backgroundColor: color.toLocaleLowerCase(), width: 30, height: 30, borderRadius: '50%' }}
                                        onClick={() => setSelectedColor(color.toLocaleLowerCase())}></div>
                                ))}
                            </div>
                        </div>
                        <div className='flex gap-2 items-center text-sm font-bold'>
                            <p>Size:</p>
                            <div className='flex gap-3 items-center'>
                                {
                                    products.sizes.map((size, idx) => (
                                        <div key={idx} className={`border-2 w-8 cursor-pointer uppercase text-center rounded-lg
                                            ${size.toUpperCase() === selectedSize && 'bg-blue-900 h-7 pt-0.5 text-white'}`}
                                            onClick={() => setSelectedSize(size.toUpperCase())}>{size}</div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='text-sm font-bold flex flex-col gap-2.5'>
                            <p>Quantity:</p>
                            <div className='flex gap-1 items-center'>
                                <button className='px-2 cursor-pointer border-2 rounded-lg text-lg'
                                    onClick={() => {
                                        if (quantity > 1) {
                                            setQuantity(quantity - 1)
                                        }
                                    }}>-</button>
                                <button className=''>{quantity}</button>
                                <button className='px-2 cursor-pointer border-2 rounded-lg text-lg'
                                    onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                        </div>
                        <button onClick={handleAddingCart}
                            className='bg-blue-800 text-black px-4 sm:px-3 cursor-pointer py-2 sm:py-1 rounded-lg hover:bg-blue-900 transition-all transform duration-300'>ADD TO CART</button>
                    </div>
                    <div>
                        <h2 className='text-sm font-bold'>Characteristics:</h2>
                        <table className="border-separate">
                            <tbody>
                                <tr>
                                    <td className="pr-8 font-medium">Brand:</td>
                                    <td>{products.brand}</td>
                                </tr>
                                <tr>
                                    <td className="pr-8 font-medium">Meterial:</td>
                                    <td>{products.meterial}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails