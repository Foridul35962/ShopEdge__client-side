import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserLayout from './components/layout/UserLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import User from './pages/User'
import Collections from './pages/Collections'

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
    ]
  }])

  
  return (
    <RouterProvider router={router} />
  )
}

export default App