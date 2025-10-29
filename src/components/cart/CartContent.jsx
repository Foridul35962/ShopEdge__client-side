import React from 'react'
import { AiFillDelete } from 'react-icons/ai';

const CartContent = () => {
  const productItem = [
    {
      productId: 1,
      name: 'T- shirt',
      size: 'M',
      color: 'Blue',
      quantity: 2,
      price: 15,
      image: 'https://picsum.photos/200?random=1'
    },
    {
      productId: 2,
      name: 'shirt',
      size: 'L',
      color: 'Red',
      quantity: 3,
      price: 30,
      image: 'https://picsum.photos/200?random=2'
    },
  ]
  return (
    <div className='flex flex-col gap-3'>
      {
        productItem.map((product, idx) => (
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
                  <button className='px-2 text-lg rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 cursor-pointer'>+</button>
                  <p>{product.quantity}</p>
                  <button className='px-2 text-lg rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 cursor-pointer' >-</button>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <p>${product.price}</p>
              <AiFillDelete className='cursor-pointer text-lg text-red-600 hover:scale-110 active:text-red-700' />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default CartContent