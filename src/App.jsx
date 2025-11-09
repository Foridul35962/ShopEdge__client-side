import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserLayout from './components/layout/UserLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import User from './pages/User'
import Collections from './pages/Collections'
import ProductDetails from './components/products/ProductDetails'
import CheckOut from './components/checkout/CheckOut'
import OrderConfirmation from './pages/OrderConfirmation'

const App = () => {
  const router = createBrowserRouter([{
    path: '/',
    element: <UserLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path:'/login',
        element: <Login />
      },
      {
        path:'/registration',
        element: <Registration />
      },
      {
        path:'/user',
        element: <User />
      },
      {
        path:'/collections/:collection',
        element: <Collections />
      },
      {
        path:'/product/:id',
        element: <ProductDetails />
      },
      {
        path:'/checkout',
        element: <CheckOut />
      },
      {
        path:'/order-confirmation',
        element: <OrderConfirmation />
      },
    ]
  }])

  
  return (
    <RouterProvider router={router} />
  )
}

export default App