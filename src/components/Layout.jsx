


import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-white min-h-screen">
      <Navbar />

      <Outlet />

      
      <Footer />
    </div>
  )
}

export default Layout