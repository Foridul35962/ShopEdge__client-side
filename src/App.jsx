import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserLayout from './components/layout/UserLayout'
import Home from './pages/Home'
import Login from './pages/Login'

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
      }
    ]
  }])

  
  return (
    <RouterProvider router={router} />
  )
}

export default App