import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserLayout from './components/layout/UserLayout'

const App = () => {
  const router = createBrowserRouter([{
    path: '/',
    element: <UserLayout />
  }])

  
  return (
    <RouterProvider router={router} />
  )
}

export default App