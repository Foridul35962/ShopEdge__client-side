import React from 'react'
import Hero from '../components/common/Hero'
import GenderCollectionSection from '../components/common/GenderCollectionSection'
import Carousel from '../components/products/Carousel'
import ProductDetails from '../components/products/ProductDetails'

const Home = () => {
  return (
    <div>
        <Hero />
        <GenderCollectionSection />
        <Carousel />
        <div className='pt-8 pb-5'>
          <h1 className='text-center text-black text-4xl font-bold '>Best Seller</h1>
        </div>
        <ProductDetails />
    </div>
  )
}

export default Home