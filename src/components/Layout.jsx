


import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="bg-gray-50 dark:bg-[#0e1629] text-white min-h-screen">
      <Navbar />

      <div className="container mx-auto  ">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default Layout