import React, { useEffect, useState } from 'react'
import Hero from '../components/common/Hero'
import GenderCollectionSection from '../components/common/GenderCollectionSection'
import Carousel from '../components/products/Carousel'
import ProductDetails from '../components/products/ProductDetails'
import TopWearWomen from '../components/products/TopWearWomen'
import FeaturedCollection from '../components/products/FeaturedCollection'
import FeatureSection from '../components/common/FeatureSection'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { fetchedProductByFilter } from '../store/slices/productSlice'
import Loading from '../components/common/Loading'

const Home = () => {
  const dispatch = useDispatch()
  const {products, loading, error} = useSelector((state)=>state.product)
  const [bestSellerProduct, setBestSellerProduct] = useState(null)
  
  useEffect(()=>{
    //fetch product by filters
    dispatch(fetchedProductByFilter({
      gender: 'Women',
      category: 'Bottom Wear',
      limit: 8
    }))

    //fetch best seller product
    const bestSeller = async ()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/products/best-seller`)
        setBestSellerProduct(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    bestSeller()
  },[dispatch])

  return (
    <div>
        <Hero />
        <GenderCollectionSection />
        <Carousel />
        <div className='pt-8 pb-5'>
          <h1 className='text-center text-black text-4xl font-bold '>Best Seller</h1>
        </div>
        {
          bestSellerProduct?(<ProductDetails productsId = {bestSellerProduct._id}/>) : <Loading />
        }
        <TopWearWomen products = {products}/>
        <FeaturedCollection />
        <FeatureSection />
    </div>
  )
}

export default Home