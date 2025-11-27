import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteProduct, fetchedAllProduct } from '../../store/slices/productSlice'
import Loading from '../../components/common/Loading';
import { toast } from 'react-toastify'

const ProductManagement = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { products, loading } = useSelector((state) => state.product)

    useEffect(() => {
        dispatch(fetchedAllProduct())
    }, [dispatch])


    const handleDeleteproduct = (productId, productName) => {
        if (window.confirm(`Are you really want to Delete ${productName}?`)) {
            dispatch(deleteProduct({ productId })).unwrap()
            toast.success('product deleted')
        }
    }

    return (
        <div className='p-5 sm:px-10 flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl sm:text-3xl font-bold'>Product Management</h1>
                <button
                    onClick={()=>navigate('/admin/products/add')}
                    className='bg-blue-600 cursor-pointer transition duration-300 text-white px-4 py-2 rounded hover:bg-blue-700'
                >
                    Add Product
                </button>
            </div>

            <div className='w-full overflow-scroll sm:overflow-hidden'>
                {
                    loading ? (<Loading />) : products.length > 0 &&
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
                                                        className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
                                                    >Edit</button>
                                                    <button
                                                        onClick={() => handleDeleteproduct(product._id, product.name)}
                                                        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                                                    >Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }
            </div>
        </div>
    )
}

export default ProductManagement