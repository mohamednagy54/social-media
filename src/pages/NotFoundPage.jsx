

import React from 'react'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4 text-blue-500">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Oops! Page not found</h2>
        <p className="text-gray-300 mb-6">
          The page you're looking for doesn’t exist or has been moved.
        </p>
        <a
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}

export default NotFoundPage