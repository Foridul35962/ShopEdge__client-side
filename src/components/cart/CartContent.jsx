import React from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteItemFromCart, updateItemQuantity } from '../../store/slices/cartSlice';
import { toast } from 'react-toastify'

const CartContent = ({ cart }) => {
  const dispatch = useDispatch()
  const handleDeleteCart = async (product) => {
    const productData = {
      productId: product.productId,
      size: product.size,
      color: product.color
    }

    try {
      await dispatch(deleteItemFromCart(productData)).unwrap()
      toast.success('product in cart removed')
    } catch (message) {
      toast.error(message)
    }
  }

  const handleIncreaseQuantity = async (product) => {
    const productData = {
      productId: product.productId,
      size: product.size,
      color: product.color,
      quantity: product.quantity + 1
    }

    try {
      await dispatch(updateItemQuantity(productData)).unwrap()
    } catch (error) {
      console.log(error);
    }
  }

  const handleDecreaseQuantity = async (product) => {
    const productData = {
      productId: product.productId,
      size: product.size,
      color: product.color,
      quantity: product.quantity - 1
    }

    try {
      await dispatch(updateItemQuantity(productData)).unwrap()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      {
        !cart.length > 0 ? (<p>Cart is empty</p>) :
          cart?.map((product, idx) => (
            <div key={idx} className='flex justify-between items-center'>
              <div className='flex gap-2 items-center'>
                <img src={product.image} alt="image" className='size-25 rounded-2xl' />
                <div>
                  <p className='font-semibold'>{product.name}</p>
                  <div className='flex flex-col sm:flex-row gap-2'>
                    <p>size : {product.size}</p>
                    <p>Color : {product.color}</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <button onClick={() => handleDecreaseQuantity(product)}
                      className='px-2 text-lg rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 cursor-pointer'
                    >
                      -
                    </button>
                    <p>{product.quantity}</p>
                    <button
                      onClick={() => handleIncreaseQuantity(product)}
                      className='px-2 text-lg rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 cursor-pointer'
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <p>${product.price}</p>
                <AiFillDelete onClick={() => handleDeleteCart(product)} className='cursor-pointer text-lg text-red-600 hover:scale-110 active:text-red-700' />
              </div>
            </div>
          ))
      }
    </div>
  )
}

export default CartContent