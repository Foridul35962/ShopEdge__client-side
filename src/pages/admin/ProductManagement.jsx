import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductManagement = () => {
    const navigate = useNavigate()

    const [products, setProducts] = useState([{
    }])

    const getProducts = [
        {
            _id: 123,
            name: 'jacket',
            price: 5465,
            sku: 'weioru'
        },
        {
            _id: 123,
            name: 'jacket',
            price: 5465,
            sku: 'weioru'
        },
    ]

    useEffect(() => {
        setProducts(getProducts)
    }, [])

    const handleDeleteproduct = (productId, productName) => {
        if (window.confirm(`Are you really want to Delete ${productName}?`)) {
            console.log(productId, productName);
        }
    }

    return (
        <div className='p-5 sm:px-10 flex flex-col gap-4'>
            <h1 className='text-3xl font-bold'>Product Management</h1>
            <div className='w-full overflow-scroll sm:overflow-hidden'>
                <table className='w-full border border-gray-200 rounded-xl shadow-xl'>
                    <thead className='bg-gray-200'>
                        <tr>
                            <td className="py-3 px-4 text-left font-semibold text-gray-700">NAME</td>
                            <td className="py-3 px-4 text-left font-semibold text-gray-700">PRICE</td>
                            <td className="py-3 px-4 text-left font-semibold text-gray-700">SKU</td>
                            <td className="py-3 px-4 text-left font-semibold text-gray-700">ACTIONS</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, idx) => (
                                <tr key={idx}
                                    className="border-t border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                                >
                                    <td className="py-3 px-4 text-gray-700">{product.name}</td>
                                    <td className="py-3 px-4 text-gray-700">{product.price}</td>
                                    <td className="py-3 px-4 text-gray-700">{product.sku}</td>
                                    <td className="py-3 px-4">
                                        <div className='flex gap-2'>
                                            <button
                                                onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                                                className='bg-green-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700'
                                            >Edit</button>
                                            <button
                                                onClick={() => handleDeleteproduct(product._id, product.name)}
                                                className='bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600'
                                            >Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductManagement