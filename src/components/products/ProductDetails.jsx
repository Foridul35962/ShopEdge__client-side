import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchedProductDetails, similarProducts } from '../../store/slices/productSlice'
import Loading from '../common/Loading'
import ProductGrid from './ProductGrid'
import { addToCart } from '../../store/slices/cartSlice'
import { toast } from 'react-toastify'
import Lottie from 'lottie-react'
import Error404 from '../../assets/No-Data.json'

const ProductDetails = ({ productsId }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { selectedProduct, products, loading } = useSelector((state) => state.product)
    const { error } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)
    const [viewImage, setViewImage] = useState(null)
    const productId = productsId || id

    //fetched product
    useEffect(() => {
        dispatch(fetchedProductDetails(productId))
    }, [dispatch, productId])

    //selected image show
    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setViewImage(selectedProduct.images[0]);
        }
    }, [selectedProduct]);

    //similar product
    useEffect(() => {
        if (!selectedProduct?._id)
            return
        const similarProduct = async () => {
            dispatch(similarProducts(selectedProduct?._id))
        }
        similarProduct()
    }, [selectedProduct, productId])

    const [selectedColor, setSelectedColor] = useState('')
    const [selectedSize, setSelectedSize] = useState('')
    const [quantity, setQuantity] = useState(1)

    const handleAddingCart = () => {
        if (!user) {
            navigate('/login')
        } else if (!selectedColor || !selectedSize || !quantity) {
            toast.warning('color/ size are not selected')
        } else {
            const productData = {
                productId,
                quantity,
                size: selectedSize,
                color: selectedColor,
                userId: user._id
            }

            dispatch(addToCart(productData))
                .unwrap()
                .then(() => {
                    toast.success("Product added to cart")
                })
                .catch((errorMessage) => {
                    toast.error(errorMessage)
                })
        }
    }

    return (
        <div>
            {loading ? (<Loading />) : (!selectedProduct ? (
                <div className='h-100 lg:h-dvh'>
                    <Lottie animationData={Error404} className='h-100 lg:h-dvh'></Lottie>
                </div>
            ) :
                <div className='container mx-auto p-5 sm:px-0'>
                    <div className='flex gap-3 md:gap-10 lg:gap-20 flex-col sm:flex-row sm:items-center'>
                        <div className='flex flex-col-reverse sm:flex-row gap-3'>
                            <div className='flex sm:flex-col gap-2'>
                                {
                                    selectedProduct?.images.map((image, idx) => (
                                        <div key={idx} className={`w-20 rounded-lg ${viewImage?.url === image?.url && "border-3 border-blue-950"}`}>
                                            <img className='w-full rounded-lg cursor-pointer' src={image.url} alt={image.altText || `Thumbnail ${idx}`} onClick={() => setViewImage(image)} />
                                        </div>
                                    ))
                                }
                            </div>
                            <div>
                                <img className='rounded-lg w-full sm:min-w-80 md:min-w-100 max-h-200 max-w-150' src={viewImage?.url} alt={viewImage?.altText || 'image'} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-xl font-semibold'>{selectedProduct?.name}</h1>
                                <p className='text-lg'>${selectedProduct?.price}</p>
                                <p className='text-sm'>{selectedProduct?.description}</p>
                                <div className='text-sm font-bold'>
                                    <p>Color:</p>
                                    <div className='flex gap-2 text-sm font-bold'>
                                        {selectedProduct?.colors?.map((color, idx) => {
                                            const normalized = color.toLowerCase(); // selection er jonno normalize
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`cursor-pointer ${normalized === selectedColor ? 'border-2' : 'border border-gray-700'}`}
                                                    style={{
                                                        backgroundColor: color, // IMPORTANT → original color use
                                                        width: 30,
                                                        height: 30,
                                                        borderRadius: '50%'
                                                    }}
                                                    onClick={() => setSelectedColor(normalized)}
                                                ></div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className='flex gap-2 items-center text-sm font-bold'>
                                    <p>Size:</p>
                                    <div className='flex gap-3 items-center'>
                                        {
                                            selectedProduct?.sizes.map((size, idx) => (
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
                                            <td>{selectedProduct?.brand}</td>
                                        </tr>
                                        <tr>
                                            <td className="pr-8 font-medium">Meterial:</td>
                                            <td>{selectedProduct?.meterial}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <h1 className='text-3xl font-bold text-center'>You May Also Like</h1>
                        <ProductGrid products={products} />
                    </div>
                </div>)
            }
        </div>
    )
}

export default ProductDetails