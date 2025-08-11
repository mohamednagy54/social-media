


import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="bg-gray-50 dark:bg-[#0e1629] text-white min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default Layout