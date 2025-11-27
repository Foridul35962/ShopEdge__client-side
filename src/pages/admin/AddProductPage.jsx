import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../store/slices/productSlice";
import { toast } from "react-toastify";

const AddProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Local state
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        countInStock: "",
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        gender: "",
        tags: "",
    });

    const [images, setImages] = useState([]);

    // Generic input update
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({ ...prev, [name]: value }));
    };

    // Sizes & Colors
    const handleArrayChange = (e, field) => {
        setProductData((prev) => ({
            ...prev,
            [field]: e.target.value.split(",").map((i) => i.trim()),
        }));
    };

    // Image selection
    const handleUploadImage = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (images.length === 0) {
            toast.error("Please upload at least one image");
            return;
        }

        // Ensure required fields
        if (!productData.name || !productData.description || !productData.price || !productData.countInStock || !productData.sku || !productData.category || !productData.collections || productData.sizes.length === 0 || productData.colors.length === 0) {
            toast.error("Please fill all required fields");
            return;
        }

        const formData = new FormData();

        // Numbers
        formData.append("price", Number(productData.price));
        formData.append("discountPrice", Number(productData.discountPrice || 0));
        formData.append("countInStock", Number(productData.countInStock));

        // Strings
        ["name", "description", "sku", "category", "brand", "collections", "material", "gender", "tags"]
            .forEach(key => formData.append(key, productData[key]));

        // Arrays
        productData.sizes.forEach(size => formData.append("sizes", size));
        productData.colors.forEach(color => formData.append("colors", color));

        // Images
        images.forEach(img => formData.append("files", img));

        try {
            await dispatch(addProduct(formData)).unwrap();
            toast.success("Product added successfully");
            navigate("/admin/products");
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Add Product</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block mb-1">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1">Description</label>
                        <textarea
                            name="description"
                            rows={4}
                            value={productData.description}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                            required
                        />
                    </div>

                    {/* Price + Stock */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                                className="w-full border px-4 py-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Count In Stock</label>
                            <input
                                type="number"
                                name="countInStock"
                                value={productData.countInStock}
                                onChange={handleChange}
                                className="w-full border px-4 py-2 rounded"
                                required
                            />
                        </div>
                    </div>

                    {/* Other text fields */}
                    {["sku", "category", "brand", "collections", "material", "tags"].map((field) => (
                        <div key={field}>
                            <label className="block mb-1 capitalize">{field}</label>
                            <input
                                type="text"
                                name={field}
                                value={productData[field]}
                                onChange={handleChange}
                                className="w-full border px-4 py-2 rounded"
                            />
                        </div>
                    ))}

                    {/* Sizes & Colors */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Sizes</label>
                            <input
                                type="text"
                                value={productData.sizes.join(", ")}
                                onChange={(e) => handleArrayChange(e, "sizes")}
                                className="w-full border px-4 py-2 rounded"
                                placeholder="e.g. S, M, L"
                            />
                        </div>
                        <div>
                            <label>Colors</label>
                            <input
                                type="text"
                                value={productData.colors.join(", ")}
                                onChange={(e) => handleArrayChange(e, "colors")}
                                className="w-full border px-4 py-2 rounded"
                                placeholder="e.g. Red, Blue"
                            />
                        </div>
                    </div>

                    {/* Gender */}
                    <div>
                        <label>Gender</label>
                        <div className="flex gap-4 mt-1">
                            {["Men", "Women", "Other"].map((g) => (
                                <label key={g} className="flex gap-2 items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={g}
                                        checked={productData.gender === g}
                                        onChange={handleChange}
                                        required
                                    />
                                    {g}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Upload Images */}
                    <div>
                        <label>Upload Images</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleUploadImage}
                            className="w-full border px-2 py-1 rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;
