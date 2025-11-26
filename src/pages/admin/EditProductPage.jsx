import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const EditProductPage = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {selectedProduct, loading} = useSelector((state)=>state.product)

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: 0,
        countInStock: 0,
        sku: '',
        category: '',
        brand: '',
        sizes: [],
        colors: [],
        collections: '',
        material: '',
        gender: '',
        images: [
            {
                url: "https://picsum.photos/500/500?random=1"
            },
            {
                url: "https://picsum.photos/500/500?random=2"
            }
        ]
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setProductData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleUploadImage = async (e) => {
        const file = e.target.files[0]
        console.log(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(productData);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Product</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Product Name */}
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            onChange={handleChange}
                            value={productData.name}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            required
                            onChange={handleChange}
                            value={productData.description}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>

                    {/* Price & Stock */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price" className="block text-gray-700 font-medium mb-1">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                required
                                value={productData.price}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="countInStock" className="block text-gray-700 font-medium mb-1">Count In Stock</label>
                            <input
                                type="number"
                                id="countInStock"
                                name="countInStock"
                                value={productData.countInStock}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Other Fields */}
                    {["sku", "category", "brand", "collections", "material"].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-gray-700 font-medium mb-1 capitalize">{field}</label>
                            <input
                                type="text"
                                id={field}
                                name={field}
                                value={productData[field]}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                    ))}

                    {/* Sizes & Colors */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="sizes" className="block text-gray-700 font-medium mb-1">Sizes (comma-separated)</label>
                            <input
                                type="text"
                                id="sizes"
                                name="sizes"
                                value={productData.sizes}
                                onChange={(e) => setProductData({
                                    ...productData,
                                    sizes: e.target.value.split(',').map((size) => size.trim())
                                })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="colors" className="block text-gray-700 font-medium mb-1">Colors (comma-separated)</label>
                            <input
                                type="text"
                                id="colors"
                                name="colors"
                                value={productData.colors}
                                onChange={(e) => setProductData({
                                    ...productData,
                                    colors: e.target.value.split(',').map((color) => color.trim())
                                })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Gender</label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={productData.gender === "male"}
                                    onChange={handleChange}
                                />
                                <span>Male</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={productData.gender === "female"}
                                    onChange={handleChange}
                                />
                                <span>Female</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    checked={productData.gender === "other"}
                                    onChange={handleChange}
                                />
                                <span>Other</span>
                            </label>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label htmlFor="image" className="block text-gray-700 font-medium mb-1">Upload Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleUploadImage}
                            className="px-2 py-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        />
                    </div>

                    {/* Image Preview */}
                    <div className="grid grid-cols-3 gap-3">
                        {productData.images.map((image, idx) => (
                            <div key={idx} className="border rounded-lg overflow-hidden shadow-sm">
                                <img src={image.url} alt="image" className="w-full h-24 object-cover" />
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProductPage