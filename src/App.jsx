import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserLayout from './components/layout/UserLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Orders from './pages/Orders'
import Collections from './pages/Collections'
import ProductDetails from './components/products/ProductDetails'
import CheckOut from './components/checkout/CheckOut'
import OrderConfirmation from './pages/OrderConfirmation'
import OrderDetails from './pages/OrderDetails'
import AdminLayout from './components/layout/AdminLayout'
import AdminHome from './pages/admin/AdminHome'
import UserManagement from './pages/admin/UserManagement'
import ProductManagement from './pages/admin/ProductManagement'
import EditProductPage from './pages/admin/EditProductPage'
import OrderManagement from './pages/admin/OrderManagement'

import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux'
import store from './store/store.js'
import ForgetPass from './pages/ForgetPass.jsx'
import Error from './pages/Error.jsx'
import ProtectedRoutes from './components/common/ProtectedRoutes.jsx'
import AddProductPage from './pages/admin/AddProductPage.jsx'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <UserLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/registration',
          element: <Registration />
        },
        {
          path: '/forget-password',
          element: <ForgetPass />
        },
        {
          path: '/orders',
          element: <Orders />
        },
        {
          path: '/collections/:collection',
          element: <Collections />
        },
        {
          path: '/product/:id',
          element: <ProductDetails />
        },
        {
          path: '/checkout',
          element: <CheckOut />
        },
        {
          path: '/order-confirmation',
          element: <OrderConfirmation />
        },
        {
          path: '/order-details/:id',
          element: <OrderDetails />
        },
      ]
    },
    {
      path: '/admin',
      element:
        <ProtectedRoutes role={'admin'}>
          <AdminLayout />
        </ProtectedRoutes>,
      children: [
        {
          path: '/admin',
          element: <AdminHome />
        },
        {
          path: '/admin/users',
          element: <UserManagement />
        },
        {
          path: '/admin/products',
          element: <ProductManagement />
        },
        {
          path: '/admin/products/:id/edit',
          element: <EditProductPage />
        },
        {
          path: '/admin/products/add',
          element: <AddProductPage />
        },
        {
          path: '/admin/orders',
          element: <OrderManagement />
        },
      ]
    },
    {
      path: '/*',
      element: <Error />
    }
  ])


  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  )
}

export default App