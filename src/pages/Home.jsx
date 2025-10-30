import React from 'react'
import Hero from '../components/common/Hero'
import GenderCollectionSection from '../components/common/GenderCollectionSection'
import Carousel from '../components/products/Carousel'

const Home = () => {
  return (
    <div>
        <Hero />
        <GenderCollectionSection />
        <Carousel />
    </div>
  )
}

export default Home